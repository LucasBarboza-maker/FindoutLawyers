import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { parseJsonBody } from '@/libraries/utils/routes';
import { diskStorage, IOMulter } from '@/libraries/utils/multer';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { nanoid } from 'nanoid'

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_Upload_EditorJsImage({
   fastify,
   redis,
   prisma,
   socket,
}: IBootstrap_Routes) {

   const upload = IOMulter({
      storage: diskStorage({
         filepath: 'blog_editor_images',
      }),
   });

   return fastify.route({
      url: '/api/client/upload/editorjs_image',
      method: 'POST',
      schema,
      preHandler: [parseJsonBody, upload.single('image')],
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
         try {

            // const user = await User_Middleware_Token({
            //    request: request as any,
            //    reply,
            //    prisma,
            // });

            const _aliasRequest = request as any;
            const file = _aliasRequest.file


            const id = nanoid()

            const url = await UploadSinglePicture({
               fileImagePath: file.path,
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
