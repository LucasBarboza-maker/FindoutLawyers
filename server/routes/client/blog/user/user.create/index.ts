import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_Blog_Create_SchemaQuerystring } from './schema';
import { parseJsonBody } from '@/libraries/utils/routes';
import { diskStorage, IOMulter } from '@/libraries/utils/multer';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { nanoid } from 'nanoid';
import { ReplyBlogDB_Created } from '@/routes/reply/blog/db';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogUser_Create({
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
        url: '/api/client/blog/user/create',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody, upload.single('imageCover')],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                });

                const body =
                    request.body as IRouteClient_Blog_Create_SchemaQuerystring;

                const _aliasRequest = request as any;
                const file = _aliasRequest.file;
                const id = nanoid();

                const imageCover = file? await UploadSinglePicture({
                    fileImagePath: file.path,
                    folder: 'blog_covers',
                    routeFolder: 'blog_covers',
                    id,
                }):null;

                //  const parser = new EditorJSParser({});
                //  const message = parser.parse(JSON.parse(body.rawMessage));

                const news = await prisma.blogTopic.create({
                    data: imageCover != null ? {
                        message: body.rawMessage,
                        rawMessage: body.rawMessage,
                        tags: [],
                        title: body.title,
                        description: body.description,
                        imageCover,
                        User: {
                            connect: {
                                id: user?.id,
                            },
                        },
                    }:
                    {
                        message: body.rawMessage,
                        rawMessage: body.rawMessage,
                        tags: [],
                        title: body.title,
                        description: body.description,
                        User: {
                            connect: {
                                id: user?.id,
                            },
                        },
                    }
                });

                return ReplyBlogDB_Created(reply, news.id);
            } catch (error) {
                console.log(error)
                return ReplyBlogSystem_ErrorGeneric(reply);
            }
        },
    });
}
