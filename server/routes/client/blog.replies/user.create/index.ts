import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_BlogReplies_Create_SchemaBody } from './schema';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';
import { parseJsonBody } from '@/libraries/utils/routes';
import { BlogUpdateTotalReplies } from '@/app/blogs/replies';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogReplies_UserCreate({
   fastify,
   redis,
   prisma,
   socket,
}: IBootstrap_Routes) {
   return fastify.route({
      url: '/api/client/blog/reply/user/create',
      method: 'POST',
      schema,
      preHandler: [parseJsonBody],
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
         try {

            const user = await User_Middleware_Token({
               prisma,
               reply,
               request,
            })

            const {
               message,
               blogId
            } = request.body as IRouteClient_BlogReplies_Create_SchemaBody;


            const topicReply = await prisma.blogTopicReplies.create({
               data: {
                  message,
                  rawMessage: '',
                  BlogTopic: {
                     connect: {
                        id: blogId
                     }
                  },
                  User: {
                     connect: {
                        id: user?.id
                     }
                  },

               }
            })

            await BlogUpdateTotalReplies(prisma, blogId)


            return reply.send({
               status: true
            });
         } catch (error) {
            console.log(error)
            return ReplyBlogSystem_ErrorGeneric(reply)
         }
      },
   });
}
