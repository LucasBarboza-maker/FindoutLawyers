import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { User_Method_IsPasswordValid } from '@/app/user/method/password';
import { parseJsonBody } from '@/libraries/utils/routes';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_News_Delete({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/news/delete',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request,
                    reply,
                    prisma,
                    role: 'ADMIN',
                });

                const { ids } = request.body as BodySchema;

                const [news] = await prisma.$transaction([
                    prisma.news.deleteMany({
                        where: {
                            id: {
                                in: ids,
                            },
                        },
                    }),
                ]);

                return reply.send({ status: true, news });
            } catch (error) {
                console.log(error);
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
