import { QUEUE_NAME } from './queues';
import { GLOBAL_TASKS } from './tasks';
import { Job, Worker } from "bullmq";

export const GlobalTasksWorker = new Worker(
   QUEUE_NAME,
   async (job: Job): Promise<void> => {
      const tasks = GLOBAL_TASKS()
      const worker = tasks[job.name];
      try {
         worker(job)
            .then(() => true)
            .catch((err) => {
               console.log(job.name, worker)
               console.error(err)
            })
            .finally(() => true)
      } catch (error) {
         console.error(error);
         console.log(worker)
         console.log(tasks)
         console.log(job)
      }
      return;
   },
   {}
);
