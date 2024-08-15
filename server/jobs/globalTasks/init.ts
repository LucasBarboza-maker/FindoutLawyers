import { GLOBAL_TASK_TIMEOUT_IN_SEC_TO_CHECKOUT } from './../../app/GlobalTask/config/index';
import { GlobalTasksQueue } from './queues';

export function InitQueues() {
   GlobalTasksQueue.add(
      'QueueUnityCycleQueueJobs',
      { status: true },
      {
         priority: 2,
         repeat: {
            every: GLOBAL_TASK_TIMEOUT_IN_SEC_TO_CHECKOUT,
            prevMillis: 0,
            count: 1,
            limit: undefined,
         },
         delay: 0,
         lifo: true,
      }
   );
}
