import { QueueTasks } from '@/server/@types/queue/TypesQueueSetup';

import { EmailTask_RegisterVerify } from '@/tasks/email/register';
import { EmailTask_NewEvaluations } from '@/tasks/email/evaluations';
import { EmailTask_NewReports } from '@/tasks/email/reports';
import { EmailTask_ForgetPassword } from '@/tasks/email/forget_password';
import { EmailTask_OrdemId } from '@/tasks/email/ordemId';
import { EmailTask_ContractPremium } from '@/tasks/email/contract_premium';
import { EmailTask_Promote } from '@/tasks/email/promote';

export function EMAIL_TASKS(): QueueTasks {
    return {
        EmailTask_RegisterVerify,
        EmailTask_NewEvaluations,
        EmailTask_NewReports,
        EmailTask_ForgetPassword,
        EmailTask_OrdemId,
        EmailTask_ContractPremium,
        EmailTask_Promote,
    };
}
