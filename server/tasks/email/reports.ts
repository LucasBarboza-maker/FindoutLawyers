import { SendMessageService } from '@/server/config/email';
import { Job } from 'bullmq';

export async function EmailTask_NewReports(job: Job<any>): Promise<Boolean> {
    try {
        const ses = new SendMessageService();
        await ses.run({
            source: 'CONTATO',
            destination: {
                ToAddresses: [SendMessageService.systemEmail('CONTATO')],
            },
            message: {
                Subject: {
                    Data: 'Novo Reports',
                },
                Body: {
                    Text: {
                        Data: `Você recebeu um novo reports no site, vá até a sua Dashboard Admin > Reports`,
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
