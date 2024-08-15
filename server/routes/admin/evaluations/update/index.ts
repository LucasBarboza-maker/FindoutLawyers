import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { UpdateEvaluationsScore } from '@/app/user/evaluations';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_Evaluations_Update({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/evaluations/update',
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

                const userEvaluations = await prisma.userEvaluations.findUnique(
                    {
                        where: {
                            id,
                        },
                        include: {
                            UserEvaluation: {
                                select: {
                                    User: {
                                        select: {
                                            email: true,
                                        },
                                    },
                                },
                            },
                        },
                    }
                );

                if (!userEvaluations) {
                    return reply.status(404).send({ status: false });
                }

                const updatedUserEvaluation =
                    await prisma.userEvaluations.update({
                        where: {
                            id,
                        },
                        data: {
                            isChecked,
                        },
                    });

                const email =
                    userEvaluations.UserEvaluation?.User &&
                    userEvaluations.UserEvaluation.User[0]
                        ? userEvaluations.UserEvaluation.User[0].email
                        : undefined;

                if (!!email) {
                    await UpdateEvaluationsScore(email, prisma);
                }

                return reply.send({ status: true });
            } catch (error) {
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
