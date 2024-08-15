import { User } from '.prisma/client';
import { SendMessageService } from '@/server/config/email';
import { Job } from 'bullmq';

export async function EmailTask_OrdemId(job: Job<User>): Promise<Boolean> {
    try {
        const user = job.data;

        const ses = new SendMessageService();
        await ses.run({
            source: 'SYSTEM',
            destination: {
                ToAddresses: [SendMessageService.systemEmail('SYSTEM')],
            },
            message: {
                Subject: {
                    Data: `${user.name} - Carteirinha`,
                },
                Body: {
                    Text: {
                        Data: `Olá o usuário, ${user.name}, atualizou a carteirinha da ordem!`,
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
