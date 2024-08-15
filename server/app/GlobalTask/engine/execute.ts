import { GlobalTasksJobs_DataContext, GlobalTaskJobs_TaskContext } from '@/types/globalTasks/index';
import * as Tasks from '@/tasks/index'
import { GlobalTasksJobs } from '@prisma/client';
import { GlobalTasksEngine } from './task'
import { GlobalTasksEngineQueue } from '.';

/*
:--------------------------------------------------------------------------
: Bootstrap and execute the task itself
:--------------------------------------------------------------------------
*/

interface RunTaskFromJobProps {
   cacheCurrentJob?: GlobalTasksJobs
   currentJob: GlobalTasksJobs;
   engine: GlobalTasksEngine;
}

export async function RunTaskFromUnitJob(globalTask: GlobalTasksEngineQueue, {
   cacheCurrentJob,
   currentJob,
   engine
}: RunTaskFromJobProps): Promise<GlobalTasksEngine | undefined> {
   try {
      if (currentJob.category === 'COMPLETED' || currentJob.category === 'ERROR') {
         return
      }

      if (!!cacheCurrentJob && cacheCurrentJob.id === currentJob.id) {
         if (currentJob.category === 'RUNNING') {
            return;
         }
      } else {
         globalTask._cacheCurrentJob = currentJob;
      }

      const dataContext: GlobalTasksJobs_DataContext = JSON.parse(currentJob.data)
      const { code, method, data } = dataContext;
      const getTask = Tasks[code]
      if (getTask && getTask[method]) {
         const getTaskMethod: GlobalTaskJobs_TaskContext = getTask[method]
         if (getTaskMethod.Task) {
            const task = getTaskMethod.Task;
            engine._currentJob = currentJob;
            engine.props = data;
            await task(engine)
         }
      }
      return engine;
   } catch (error) {
      console.error(error)
      return;
   }
}
