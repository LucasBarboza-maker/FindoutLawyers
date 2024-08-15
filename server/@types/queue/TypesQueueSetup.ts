import { Queue, Worker, Job } from 'bullmq';

export interface IQueueSetupRunner {
   Queue: Queue<any, any, string>;
   Worker: Worker<any, void, string>;
   QUEUE_NAME: string;
   InitQueues: () => void;
   RegisterQueues?: () => void;
}

export type QueueTasksFunction = (job: Job<any, any, any>) => Promise<any>
export type QueueTasks = Record<any, QueueTasksFunction>
