import { Job } from 'bullmq';
import { SendMessageService } from '@/server/config/email';
import { JobEmailPromoteProps } from '@/server/jobs/email/jobs';

export async function EmailTask_Promote(
    job: Job<JobEmailPromoteProps>
): Promise<Boolean> {
    try {
        const { user, category } = job.data;

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
                    Data:
                     'Parabéns, você foi promovido'
                        },
                Body: {
                    Text: {
                        Data:
                                 `Você adquiriu a promoção para aparecer no Banner na página Home do site. A página Home é uma das mais acessads do site pelos visitantes, o que irá lhe garantir uma boa visibilidade e mais chances de atrair clientes.\nDica: utilize uma foto que mostre o seu rosto claramente e de preferência sorrindo, pode ajudar a chamar à atenção dos visitantes. 
                                  E Você Também adquiriu a promoção para aparecer no topo das pesquisas do site. O seu card terá um design diferente dos demais, o que irá ajudar a chamar à atenção dos visitantes, além que você será priorizado pelo o algoritimo de pesquisa.`,
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
