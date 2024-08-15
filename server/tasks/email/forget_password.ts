import { User } from '.prisma/client';
import { Job } from 'bullmq';
import { STRIPE_DOMAIN } from '@/config/stripe/index';
import { SendMessageService } from '@/server/config/email';

export async function EmailTask_ForgetPassword(
    job: Job<User>
): Promise<Boolean> {
    try {
        const user = job.data;

        const link = `${STRIPE_DOMAIN}/auth/password/${user.id}`;

        const ses = new SendMessageService();
        await ses.run({
            source: 'SUPPORT',
            destination: {
                ToAddresses: [
                    SendMessageService.toAddress(user.name, user.email),
                ],
            },
            message: {
                Subject: {
                    Data: 'Esqueci minha senha - Find Out Lawyers',
                },
                Body: {
                    Text: {
                        Data: `Olá, ${user.name}, para definir uma nova senha na Find Out Lawyers, é necessário você clicar no link a seguir: ${link}`,
                    },
                },
            },
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
