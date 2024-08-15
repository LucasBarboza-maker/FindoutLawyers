import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteBlog_BlogUser_Actions_BodySchema } from './schema';
import { ReplyBlogDB_NotFound } from '@/routes/reply/blog/db';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';
import { BlogUpdateTotalLikes } from '@/app/blogs/likes';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogUser_Actions({
   fastify,
   redis,
   prisma,
   socket,
}: IBootstrap_Routes) {
   return fastify.route({
      url: '/api/client/blog/user/actions',
      method: 'POST',
      schema,
      preHandler: [parseJsonBody],
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
         try {

            const user = await User_Middleware_Token({
               prisma,
               reply,
               request
            })

            const {
               id, category
            } = request.body as IRouteBlog_BlogUser_Actions_BodySchema;


            const currentNews = await prisma.blogTopic.findFirst({
               where: {
                  id,

               },
            })

            if (!currentNews) {
               return ReplyBlogDB_NotFound(reply)
            }

            const hasAlreadyAction = await prisma.blogTopicActions.findFirst({
               where: {
                  BlogTopic: { id },
                  User: { email: user?.email }
               }
            })

            if (!!hasAlreadyAction) {
               const deleteBlogAction = await prisma.blogTopicActions.delete({
                  where: { id: hasAlreadyAction.id }
               })
            } else {
               const createBlogAction = await prisma.blogTopicActions.create({
                  data: {
                     User: { connect: { id: user?.id } },
                     category,
                     BlogTopic: { connect: { id } }
                  }
               })
            }


            await BlogUpdateTotalLikes(prisma, currentNews.id)


            return reply.send({ status: true });
         } catch (error) {
            console.error(error)
            return ReplyBlogSystem_ErrorGeneric(reply)
         }
      },
   });
}
