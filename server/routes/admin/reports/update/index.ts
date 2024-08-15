import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_Reports_Update({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/reports/update',
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

                const { id, isChecked } = request.body as BodySchema;

                const userReports = await prisma.userReports.findUnique({
                    where: {
                        id,
                    },
                });

                if (!userReports) {
                    return reply.status(404).send({ status: false });
                }

                const updatedUserReports = await prisma.userReports.update({
                    where: {
                        id,
                    },
                    data: {
                        isChecked,
                    },
                });

                return reply.send({ status: true });
            } catch (error) {
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
