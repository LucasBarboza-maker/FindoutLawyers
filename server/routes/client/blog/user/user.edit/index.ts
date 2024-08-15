import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_Blog_Edit_SchemaBody } from './schema';
import { parseJsonBody } from '@/libraries/utils/routes';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';
import { EditorJSParser } from '@/libraries/editorjs';
import { diskStorage, IOMulter } from '@/libraries/utils/multer';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { nanoid } from 'nanoid';
/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogUser_Edit({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    const upload = IOMulter({
        storage: diskStorage({
            filepath: 'blog_covers',
        }),
    });
    return fastify.route({
        url: '/api/client/blog/user/edit',
        method: 'PUT',
        schema,
        preHandler: [parseJsonBody, upload.single('imageCover')],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request,
                    reply,
                    prisma,
                });

                const { id, description, rawMessage, tags, title } =
                    request.body as IRouteClient_Blog_Edit_SchemaBody;

                const blogTopic = await prisma.blogTopic.findFirst({
                    where: { id, User: { id: user?.id } },
                });

                if (!blogTopic) {
                    return ReplyBlogSystem_ErrorGeneric(reply);
                }

                const _aliasRequest = request as any;
                const file = _aliasRequest.file;

                let imageCover: string | undefined;

                if (!!file) {
                    const fileID = nanoid();
                    imageCover = await UploadSinglePicture({
                        fileImagePath: file.path,
                        folder: 'blog_covers',
                        routeFolder: 'blog_covers',
                        id: fileID,
                    });
                }

                await prisma.blogTopic.update({
                    where: {
                        id,
                    },
                    data: {
                        description,
                        title,
                        tags: [],
                        rawMessage,
                        message: rawMessage,
                        imageCover,
                    },
                });

                return reply.send({ status: true });
            } catch (error) {
                return ReplyBlogSystem_ErrorGeneric(reply);
            }
        },
    });
}
