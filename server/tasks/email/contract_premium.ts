import { User } from '.prisma/client';
import { Job } from 'bullmq';
import { SendMessageService } from '@/server/config/email';

export async function EmailTask_ContractPremium(
    job: Job<User>
): Promise<Boolean> {
    try {
        const user = job.data;

        const link = `https://encontreumadvogado.com/public/uploads/contract_premium.pdf`;

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
                    Data: 'Contrato de Prestação de Serviço',
                },
                Body: {
                    Text: {
                        Data: `Olá, ${user.name}, segue o contrato que você aceitou ao se tornar um usuário premium. O contrato está no link a seguir, onde você poderá optar por baixá-lo: ${link}`,
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
