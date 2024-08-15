import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteAdmin_User_Delete_SchemaBody } from './schema';
import { User_Method_IsPasswordValid } from '@/app/user/method/password';
import { parseJsonBody } from '@/libraries/utils/routes';
import { EMAIL_MAIN_ACCOUNT } from '@/config/email/config';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_User_Delete({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/user/delete',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request,
                    reply,
                    prisma,
                    role: 'ADMIN',
                });

                const { emails, password } =
                    request.body as IRouteAdmin_User_Delete_SchemaBody;

                const isPasswordValid = await User_Method_IsPasswordValid(
                    password,
                    user?.password || ''
                );

                if (!isPasswordValid) {
                    return reply.status(404).send({ status: false });
                }

                let filtred_emails = emails.filter(
                    (email) => email !== EMAIL_MAIN_ACCOUNT
                );

                const [users] = await prisma.$transaction([
                    prisma.user.deleteMany({
                        where: {
                            email: {
                                in: filtred_emails,
                            },
                        },
                    }),
                ]);

                return reply.send(users);
            } catch (error) {
                console.log(error);
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}
