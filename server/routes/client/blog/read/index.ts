import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteBlog_Blog_Read_SchemaQuerystring } from './schema';
import { ReplyBlogDB_NotFound } from '@/routes/reply/blog/db';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_News_Read({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/blog/read',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                });

                const { id } =
                    request.query as IRouteBlog_Blog_Read_SchemaQuerystring;

                const news = await prisma.blogTopic.findFirst({
                    where: {
                        id,
                    },
                    include: {
                        User: {
                            select: {
                                id: true,
                                category: true,
                                imageCover: true,
                                name: true,
                                surname: true,
                                role: true,
                            },
                        },
                        // actions: true,
                        // replies: true
                    },
                });

                if (!news) {
                    return ReplyBlogDB_NotFound(reply);
                }

                return reply.send(news);
            } catch (error) {
                return ReplyBlogSystem_ErrorGeneric(reply);
            }
        },
    });
}
