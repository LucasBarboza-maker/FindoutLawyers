import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { OmitKeys } from '@/libraries/utils/object';
import { ReplyUserDB_InvalidAccount } from '@/routes/reply/user/db';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_User_Update({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/user/update',
        method: 'PUT',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const admin = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                    role: 'ADMIN',
                });

                const { id, isChecked, isBlockedToAccess } =
                    request.body as BodySchema;

                const user = await prisma.user.findUnique({
                    where: {
                        id,
                    },
                });

                if (!user) {
                    return ReplyUserDB_InvalidAccount(reply);
                }

                const updateUser = await prisma.user.update({
                    where: {
                        id,
                    },
                    data: {
                        isBlockedToAccess,
                        isChecked,
                    },
                });

                return reply.status(200).send({ status: true });
            } catch (error) {
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
