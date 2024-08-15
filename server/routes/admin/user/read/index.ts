import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteAdmin_User_Read_SchemaQuerystring } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { OmitKeys } from '@/libraries/utils/object';
import { ReplyUserDB_InvalidAccount } from '@/routes/reply/user/db';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_User_Read({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/user/read',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const admin = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                    role: 'ADMIN',
                });

                const { id } =
                    request.query as IRouteAdmin_User_Read_SchemaQuerystring;

                const user = await prisma.user.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        evaluation: {
                            select: {
                                id: true,
                                evaluations: {
                                    include: {
                                        user: {
                                            select: {
                                                id: true,
                                                name: true,
                                                surname: true,
                                                email: true,
                                                imageCover: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });

                if (!user) {
                    return ReplyUserDB_InvalidAccount(reply);
                }

                return reply.send(OmitKeys(['password'], user));
            } catch (error) {
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
