import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_Blog_EditCover_SchemaBody } from './schema';
import { parseJsonBody } from '@/libraries/utils/routes';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';
import { diskStorage, IOMulter } from '@/libraries/utils/multer';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { nanoid } from 'nanoid';
import { basename } from 'path';
import { PublicRoute } from '@/server/path';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogUser_EditCover({
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

    async function deleteOldImage(src: string) {
        try {
            const filename = basename(src);
            await PublicRoute.io().remove({
                routeName: 'blog_covers',
                filename,
            });
        } catch (error) {}
    }

    return fastify.route({
        url: '/api/client/blog/user/edit/cover',
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

                const { id } =
                    request.body as IRouteClient_Blog_EditCover_SchemaBody;

                const blogTopic = await prisma.blogTopic.findFirst({
                    where: { id, User: { id: user?.id } },
                });

                if (!blogTopic) {
                    return ReplyBlogSystem_ErrorGeneric(reply);
                }

                const _aliasRequest = request as any;
                const file = _aliasRequest.file;
                const imageCoverId = nanoid();

                const imageCover = await UploadSinglePicture({
                    fileImagePath: file.path,
                    folder: 'blog_covers',
                    routeFolder: 'blog_covers',
                    id: imageCoverId,
                });

                if (!!imageCover && blogTopic.imageCover) {
                    deleteOldImage(blogTopic.imageCover)
                        .then(() => true)
                        .catch(() => false);
                }

                await prisma.blogTopic.update({
                    where: {
                        id,
                    },
                    data: {
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
