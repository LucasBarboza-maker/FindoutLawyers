import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema } from './schema';
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

export function RouteClient_User_Cover({
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
        url: '/api/client/user/cover',
        method: 'PUT',
        schema,
        preHandler: [parseJsonBody, upload.single('imageCover')],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const _aliasRequest = request as any;
                const file = _aliasRequest.file;

                const id = FilenameSaveFormat(
                    user?.email || Date.now().toString(16)
                );

                const imageCover = await UploadSinglePicture({
                    fileImagePath: file.path,
                    folder: 'users',
                    routeFolder: 'users',
                    id: `cover/${id}`,
                });

                await prisma.user.update({
                    where: {
                        id: user?.id,
                    },
                    data: {
                        imageCover,
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
