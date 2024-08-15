import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { parseJsonBody } from '@/libraries/utils/routes';
import { diskStorage, IOMulter } from '@/libraries/utils/multer';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { FilenameSaveFormat } from '@/libraries/utils/string';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_User_Background({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    const upload = IOMulter({
        storage: diskStorage({
            filepath: 'users',
        }),
    });

    return fastify.route({
        url: '/api/client/user/background',
        method: 'PUT',
        schema,
        preHandler: [parseJsonBody, upload.single('imageBackground')],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const body = request.body as BodySchema;

                let imageBackground: string | undefined;

                const _aliasRequest = request as any;
                const file = _aliasRequest.file;

                if (!!file) {
                    const id = FilenameSaveFormat(
                        user?.email || Date.now().toString(16)
                    );

                    imageBackground = await UploadSinglePicture({
                        fileImagePath: file.path,
                        folder: 'users',
                        routeFolder: 'users',
                        id: `background/${id}`,
                    });
                }

                await prisma.user.update({
                    where: {
                        id: user?.id,
                    },
                    data: {
                        imageBackground:
                            !!body.action && body.action === 'remove'
                                ? null
                                : imageBackground,
                    },
                });

                return reply.send({ status: true });
            } catch (error) {
                console.error(error);
                return reply.status(500).send({ status: false });
            }
        },
    });
}
