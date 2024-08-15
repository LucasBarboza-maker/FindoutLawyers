import { SendMessageService } from '@/server/config/email';
import { Job } from 'bullmq';

export async function EmailTask_NewEvaluations(
    job: Job<any>
): Promise<Boolean> {
    try {
        const ses = new SendMessageService();
        await ses.run({
            source: 'CONTATO',
            destination: {
                ToAddresses: [SendMessageService.systemEmail('CONTATO')],
            },
            message: {
                Subject: {
                    Data: 'Nova Avaliação',
                },
                Body: {
                    Text: {
                        Data: `Você recebeu uma nova avaliação, vá até a sua Dashboard Admin > Avaliações`,
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
