import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { parseJsonBody } from '@/libraries/utils/routes';
import { ReplyUserAccount_RegisterAccountError } from '@/routes/reply/user/account';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { UserUpdateSearchable } from '@/app/user/method/searchable';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_User_Update({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/user/update',
        method: 'PUT',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const {
                    name,
                    surname,
                    contactCellphone,
                    contactCity,
                    contactState,
                    contactCountry,
                    lawyerSubscriptionId,
                    highlightedWorkFields,
                    workFields,
                    contactEmail,
                    contactWebsite,
                    description,
                    resume,
                } = request.body as BodySchema;

                const updatedUser = await prisma.user.update({
                    where: {
                        id: user?.id,
                    },
                    data: {
                        name,
                        surname,
                        contactCellphone,
                        contactCity,
                        contactState,
                        contactCountry,
                        lawyerSubscriptionId,
                        highlightedWorkFields,
                        workFields,
                        contactEmail,
                        contactWebsite,
                        description,
                        resume,
                    },
                });

                UserUpdateSearchable(prisma, user?.email);

                return reply
                    .status(200)
                    .send({ status: true, code: 'UPDATED' });
            } catch (error) {
                return ReplyUserAccount_RegisterAccountError(reply);
            }
        },
    });
}
