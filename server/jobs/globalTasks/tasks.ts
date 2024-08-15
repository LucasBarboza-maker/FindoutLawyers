import { QueueTasks } from '@/server/@types/queue/TypesQueueSetup'

import { ParallelTask as QueueUnityCycleQueueJobs } from '@/tasks/global/cycle'

export function GLOBAL_TASKS(): QueueTasks {
   return {
      QueueUnityCycleQueueJobs
   }
}
