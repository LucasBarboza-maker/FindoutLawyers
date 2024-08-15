import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { parseJsonBody } from '@/libraries/utils/routes';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { diskStorage, IOMulter } from '@/libraries/utils/multer';
import { nanoid } from 'nanoid';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_News_Create({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    const upload = IOMulter({
        storage: diskStorage({
            filepath: 'news',
        }),
    });

    return fastify.route({
        url: '/api/admin/news/create',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody, upload.single('thumbnail')],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const admin = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                    role: 'ADMIN',
                });

                const body = request.body as BodySchema;

                const _aliasRequest = request as any;
                const file = _aliasRequest.file;
                const id = nanoid();

                const thumbnail = await UploadSinglePicture({
                    fileImagePath: file.path,
                    folder: 'news',
                    routeFolder: 'news',
                    id,
                });

                const news = await prisma.news.create({
                    data: {
                        description: body.description,
                        link: body.link,
                        source: body.source,
                        title: body.title,
                        thumbnail,
                    },
                });

                return reply.send({
                    status: true,
                });
            } catch (error) {
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
