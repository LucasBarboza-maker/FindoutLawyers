import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { diskStorage, IOMulter } from '@/libraries/utils/multer';
import { nanoid } from 'nanoid';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_Banners_Update({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    const upload = IOMulter({
        storage: diskStorage({
            filepath: 'banners',
        }),
    });
    return fastify.route({
        url: '/api/admin/banner_update',
        method: 'PUT',
        schema,
        preHandler: [parseJsonBody, upload.single('banner')],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const admin = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                    role: 'ADMIN',
                });

                const { page, isVisible, link } = request.body as BodySchema;

                const banner = await prisma.banners.findUnique({
                    where: {
                        page,
                    },
                });

                if (!banner) {
                    await prisma.banners.create({
                        data: {
                            page,
                        },
                    });
                }

                let filepath: string | undefined;

                const _aliasRequest = request as any;
                const file = _aliasRequest.file;
                const id = page.toLowerCase();

                if (!!file) {
                    filepath = await UploadSinglePicture({
                        fileImagePath: file.path,
                        folder: 'banners',
                        routeFolder: 'banners',
                        id,
                    });
                }

                await prisma.banners.update({
                    where: {
                        page,
                    },
                    data: {
                        filepath,
                        isVisible:
                            typeof isVisible === 'string'
                                ? /(true)/i.test(isVisible)
                                : isVisible,
                        link,
                    },
                });

                return reply.send({ status: !!banner });
            } catch (error) {
                console.error(error);
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
