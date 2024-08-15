import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_Blog_Delete_SchemaBody } from './schema';
import { User_Method_IsPasswordValid } from '@/app/user/method/password';
import { parseJsonBody } from '@/libraries/utils/routes';
import { ReplyUserDB_ErrorPassword } from '@/routes/reply/user/db';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';
import { ReplyBlogDB_Deleted } from '@/routes/reply/blog/db';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogUser_Delete({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/blog/user/delete',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request,
                    reply,
                    prisma,
                });

                const { id, password } =
                    request.body as IRouteClient_Blog_Delete_SchemaBody;

                const isPasswordValid = await User_Method_IsPasswordValid(
                    password,
                    user?.password || ''
                );

                if (!isPasswordValid) {
                    return ReplyUserDB_ErrorPassword(reply);
                }

                const blogTopic = await prisma.blogTopic.findFirst({
                    where: {
                        id,
                        User: { id: user?.id },
                    },
                });

                if (!blogTopic) {
                    return ReplyBlogSystem_ErrorGeneric(reply);
                }

                await prisma.$transaction([
                    prisma.blogTopicActions.deleteMany({
                        where: { BlogTopic: { id: blogTopic.id } },
                    }),
                    prisma.blogTopicReplies.deleteMany({
                        where: { BlogTopic: { id: blogTopic.id } },
                    }),
                    prisma.blogTopic.delete({ where: { id: blogTopic.id } }),
                ]);

                return ReplyBlogDB_Deleted(reply);
            } catch (error) {
                return ReplyBlogSystem_ErrorGeneric(reply);
            }
        },
    });
}
