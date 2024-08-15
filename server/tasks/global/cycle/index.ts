import { Job } from 'bullmq';
import { globalTasks } from '@/app/GlobalTask';

export async function ParallelTask(job: Job): Promise<Boolean> {
   try {

      if (!!globalTasks) {
         await globalTasks.unitCycle();
      }

      // await job.moveToCompleted({}, job.id || job.name)

      return true;
   } catch (error) {
      console.log(error);
      return false;
   }
}


