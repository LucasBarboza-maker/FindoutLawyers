import { PublicRoute } from '@/server/path';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_UploadEditorJS_URL_BodyProps } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { parseJsonBody } from '@/libraries/utils/routes';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { nanoid } from 'nanoid'

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_Upload_EditorJsUrl({
   fastify,
   redis,
   prisma,
   socket,
}: IBootstrap_Routes) {


   return fastify.route({
      url: '/api/client/upload/editorjs_url',
      method: 'POST',
      schema,
      preHandler: [parseJsonBody],
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
         try {

            // const user = await User_Middleware_Token({
            //    request: request as any,
            //    reply,
            //    prisma,
            // });

            const tmpName = Date.now().toString(16)

            const { imageUrl } = request.body as IRouteClient_UploadEditorJS_URL_BodyProps

            await PublicRoute.stream().download({
               url: imageUrl,
               destination: PublicRoute.plug('blog_editor_images', tmpName),
               protocol: 'https'
            })

            const id = nanoid()

            const url = await UploadSinglePicture({
               fileImagePath: PublicRoute.plug('blog_editor_images', tmpName),
               folder: 'blog_editor_images',
               routeFolder: 'blog_editor_images',
               id
            })


            const { hostname, protocol } = request;


            return reply.send({
               success: url ? 1 : 0,
               file: {
                  url: url ? `${protocol}://${hostname}/${url}` : undefined
               }
            })

         } catch (error) {
            console.error(error)
            return reply.send({
               success: 0,
               file: {
                  url: ''
               }
            })
         }
      },
   });
}
