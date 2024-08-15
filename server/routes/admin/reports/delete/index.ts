import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, QuerySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_Reports_Delete({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/reports/delete',
        method: 'DELETE',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const admin = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                    role: 'ADMIN',
                });

                const { id } = request.query as QuerySchema;

                const userReports = await prisma.userReports.findUnique({
                    where: {
                        id,
                    },
                });

                if (!userReports) {
                    return reply.status(404).send({ status: false });
                }

                const deletedUserReports = await prisma.userReports.delete({
                    where: {
                        id,
                    },
                });

                return reply.send({ status: !!deletedUserReports });
            } catch (error) {
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
