import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_BlogReplies_UserDelete_SchemaQuerystring } from './schema';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';
import { BlogUpdateTotalReplies } from '@/app/blogs/replies';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogReplies_UserDelete({
   fastify,
   redis,
   prisma,
   socket,
}: IBootstrap_Routes) {
   return fastify.route({
      url: '/api/client/blog/reply/user/delete',
      method: 'DELETE',
      schema,
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
         try {

            const user = await User_Middleware_Token({
               prisma,
               reply,
               request,
            })

            const {
               replyId
            } = request.query as IRouteClient_BlogReplies_UserDelete_SchemaQuerystring;

            const blogTopicReplies = await prisma.blogTopicReplies.findFirst({
               where: {
                  User: {
                     id: user?.id
                  },
                  id: {
                     in: [replyId]
                  }
               },
               include: {
                  BlogTopic: {
                     select: {
                        id: true
                     }
                  }
               }
            })

            if (!blogTopicReplies || !blogTopicReplies.BlogTopic) {
               return reply.send({ status: false })
            }


            await prisma.blogTopicReplies.delete({
               where: {
                  id: blogTopicReplies.id
               }
            })

            await BlogUpdateTotalReplies(prisma, blogTopicReplies.BlogTopic.id)


            return reply.send({
               status: true
            });
         } catch (error) {
            return ReplyBlogSystem_ErrorGeneric(reply)
         }
      },
   });
}
