import { ReplyUserDB_InvalidAccount } from '@/routes/reply/user/db';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_UserProfile_SchemaQuerystring } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { OmitKeys } from '@/libraries/utils/object';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_User_Profile({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/user/profile',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const { type } =
                    request.query as IRouteClient_UserProfile_SchemaQuerystring;

                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                    include: {
                        settings: true,
                        evaluation: {
                            select: {
                                average: true,
                            },
                        },
                    },
                });

                return reply.status(200).send(OmitKeys(['password'], user));
            } catch (error) {
                return ReplyUserDB_InvalidAccount(reply);
            }
        },
    });
}
