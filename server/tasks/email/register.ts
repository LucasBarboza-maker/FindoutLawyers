import { User } from '.prisma/client';
import { Job } from 'bullmq';
import { STRIPE_DOMAIN } from '@/config/stripe/index';
import { SendMessageService } from '@/server/config/email';

export async function EmailTask_RegisterVerify(
    job: Job<User>
): Promise<Boolean> {
    try {
        const user = job.data;

        const link = `${STRIPE_DOMAIN}/profile/verify/${user.id}`;

        const ses = new SendMessageService();
        await ses.run({
            source: 'SYSTEM',
            destination: {
                ToAddresses: [
                    SendMessageService.toAddress(user.name, user.email),
                ],
            },
            message: {
                Subject: {
                    Data: 'Ativar conta - Find Out Lawyers',
                },
                Body: {
                    Text: {
                        Data: `Olá, ${user.name}, agradecemos o seu cadastro na Find Out Lawyers, seja muito bem-vindo! Para ativar a sua conta é necessário você clicar no link a seguir: ${link}`,
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
