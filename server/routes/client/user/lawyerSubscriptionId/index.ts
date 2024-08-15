import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { parseJsonBody } from '@/libraries/utils/routes';
import { diskStorage, IOMulter } from '@/libraries/utils/multer';
import { UploadSinglePicture } from '@/app/upload/UploadSinglePicture';
import { FilenameSaveFormat } from '@/libraries/utils/string';
import { JobsEmail } from '@/server/jobs/email';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_User_LawyerSubscriptionId({
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
        url: '/api/client/user/setup/subscription_id',
        method: 'PUT',
        schema,
        preHandler: [
            parseJsonBody,
            upload.fields([
                { name: 'lawyerCardFront', maxCount: 1 },
                { name: 'lawyerCardBack', maxCount: 1 },
            ]),
        ],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const body = request.body as BodySchema;

                const _aliasRequest = request as any;
                const files = _aliasRequest.files;

                let lawyerCardFront: string | undefined;
                let lawyerCardBack: string | undefined;

                let frontCard: Record<any, any> | undefined = files[
                    'lawyerCardFront'
                ]
                    ? files['lawyerCardFront'][0]
                    : undefined;

                if (!!frontCard) {
                    const id = FilenameSaveFormat(
                        `cover.${user?.email || Date.now().toString(16)}`
                    );
                    lawyerCardFront = await UploadSinglePicture({
                        fileImagePath: frontCard.path,
                        folder: 'users',
                        routeFolder: 'users',
                        id: `subscriptions/${id}`,
                    });
                }

                let frontBack: Record<any, any> | undefined = files[
                    'lawyerCardBack'
                ]
                    ? files['lawyerCardBack'][0]
                    : undefined;

                if (!!frontBack) {
                    const id = FilenameSaveFormat(
                        `back.${user?.email || Date.now().toString(16)}`
                    );
                    lawyerCardBack = await UploadSinglePicture({
                        fileImagePath: frontBack.path,
                        folder: 'users',
                        routeFolder: 'users',
                        id: `subscriptions/${id}`,
                    });
                }

                await prisma.user.update({
                    where: {
                        id: user?.id,
                    },
                    data: {
                        lawyerCardBack,
                        lawyerCardFront,
                        lawyerOrdemUrl: body.lawyerOrdemUrl,
                        lawyerSubscriptionId: body.lawyerSubscriptionId,
                    },
                });

                if (!!user) {
                    JobsEmail.OrdemId(user);
                }

                return reply.send({ status: true });
            } catch (error) {
                console.error(error);
                return reply.status(500).send({ status: false });
            }
        },
    });
}
