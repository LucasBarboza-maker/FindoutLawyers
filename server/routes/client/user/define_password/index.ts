import { ReplyUserDB_InvalidAccount } from '@/routes/reply/user/db';
import { IBootstrap_Routes } from '@/types/routes';
import { schema, IRouteClient_UserDefinePassword_SchemaBody } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { User_Method_IsPasswordValid } from '@/app/user/method/password';
import {
    ReplyUserAccount_InvalidPassword,
    ReplyUserAccount_PasswordIsDefined,
} from '@/routes/reply/user/account';
import { Encrypt_CryptSalt } from '@/libraries/utils/encrypt';
import { parseJsonBody } from '@/libraries/utils/routes';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_User_DefinePassword({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/user/define_password',
        method: 'PUT',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request, reply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const body =
                    request.body as IRouteClient_UserDefinePassword_SchemaBody;

                const isPasswordValid = await User_Method_IsPasswordValid(
                    body.oldPassword,
                    user?.password || ''
                );

                if (!isPasswordValid || body.password !== body.checkPassword) {
                    return ReplyUserAccount_InvalidPassword(reply);
                }

                const password = await Encrypt_CryptSalt(body.password, 5);

                await prisma.user.update({
                    where: {
                        id: user?.id,
                    },
                    data: {
                        password,
                    },
                });

                return reply.send({ status: true });
            } catch (error) {
                console.error(error);
                return ReplyUserDB_InvalidAccount(reply);
            }
        },
    });
}
