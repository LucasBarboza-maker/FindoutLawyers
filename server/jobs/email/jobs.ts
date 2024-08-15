import { User } from '.prisma/client';
import { EmailQueue } from './queues';

export function Register(user: User) {
    EmailQueue.add('EmailTask_RegisterVerify', user, {
        removeOnComplete: true,
        attempts: 2,
        priority: 2,
        lifo: true,
    });
}

export type JobEmailPromoteProps = {
    user: User;
    category: 'BANNER' | 'SEARCH';
};

export function Promote(props: JobEmailPromoteProps) {
    EmailQueue.add('EmailTask_Promote', props, {
        removeOnComplete: true,
        attempts: 2,
        priority: 2,
        lifo: true,
    });
}

export function ContractPremium(user: User) {
    EmailQueue.add('EmailTask_ContractPremium', user, {
        removeOnComplete: true,
        attempts: 2,
        priority: 2,
        lifo: true,
    });
}

export function ForgetPassword(user: User) {
    EmailQueue.add('EmailTask_ForgetPassword', user, {
        removeOnComplete: true,
        attempts: 2,
        priority: 2,
        lifo: true,
    });
}

export function OrdemId(user: User) {
    EmailQueue.add('EmailTask_OrdemId', user, {
        removeOnComplete: true,
        attempts: 2,
        priority: 2,
        lifo: true,
    });
}

export function NewReports(data: any) {
    EmailQueue.add('EmailTask_NewReports', data, {
        removeOnComplete: true,
        attempts: 2,
        priority: 2,
        lifo: true,
    });
}

export function NewEvaluations(data: any) {
    EmailQueue.add('EmailTask_NewEvaluations', data, {
        removeOnComplete: true,
        attempts: 2,
        priority: 2,
        lifo: true,
    });
}
