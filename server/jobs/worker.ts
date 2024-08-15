import { Job, Worker } from "bullmq";
import { QueueTasks } from "../@types/queue/TypesQueueSetup";


export function GenericJobWorker(queueName, queueTasks: QueueTasks): Worker<any, void, string> {
   return new Worker(
      queueName,
      async (job: Job): Promise<void> => {
         const worker = queueTasks[job.name];
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
            console.log(queueName, job.name)
            console.log(worker)
            console.log(queueTasks)
            console.log(queueTasks[queueName])
            console.log(job)
         }
         return;
      },
      {}
   );
}
