import { GlobalTasksJobsCategory, GlobalTasksQueueId, PrismaClient, GlobalTasksJobs, GlobalTasks } from '@prisma/client';
import { prisma } from '@/server/config/prisma';
import { RedisClient } from 'redis';
import { redis } from '@/server/config/redis';
import { GlobalTasksEngine } from './task'
import { RunTaskFromUnitJob } from './execute';
import { GLOBAL_TASK_UNIT_PER_RUNNING } from '../config';

/*
:--------------------------------------------------------------------------
: Setup of GlobalTaskQueue Engine
:--------------------------------------------------------------------------
*/

export class GlobalTasksEngineQueue {

   prisma: PrismaClient;
   redis: RedisClient;

   _tasks: (GlobalTasks & ({
      jobs: GlobalTasksJobs[]
   }))[];

   _currentTask?: (GlobalTasks & ({
      jobs: GlobalTasksJobs[]
   }));

   _jobs: GlobalTasksJobs[];
   _currentJob?: GlobalTasksJobs
   _cacheCurrentJob?: GlobalTasksJobs
   _executingTask: number;

   /**
    * @constructor
    */

   constructor() {
      this.prisma = prisma;
      this.redis = redis;
      this._tasks = []
      this._jobs = []
      this._executingTask = 0;
   }

   /**
    * @description Listen jobs assignment
   */

   hasBeenInitalized() {
      console.log('GLOBAL.TASKS\t', 'Initialized!')
   }

   /**
    * @description category value
    */

   taskCategoryValue(category: GlobalTasksJobsCategory) {
      const value = {
         INERTIA: 0,
         STOPPED: 2,
         RUNNING: 1
      };

      return value[category] || 0
   }

   /**
    * @description Check up the cycle of task per unit
    */

   async unitCycle() {
      if (!this._currentJob) {
         // await this.fillTasks();
         await this.fillUnitJobs();
         this.getCurrentUnitJob();
      } else if (this._currentJob.category === 'COMPLETED' || this._currentJob.category === 'ERROR') {
         this._currentJob = undefined
         return await this.unitCycle();
      }
      // console.log(this._currentJob?.data)
      await this.executeUnitQueue();
   }

   /**
   * @description Get the global task instance
   */

   async task(key: string, id: GlobalTasksQueueId): Promise<GlobalTasksEngine> {
      const task = new GlobalTasksEngine(this, key)
      await task.upsertDatabase(id)
      return task;
   }

   /**
   * @description Get the list of jobs
   */

   async jobs(key?: GlobalTasksQueueId, category?: GlobalTasksJobsCategory[], priority?: number) {
      const globalTasksQueue = this.prisma.globalTasksQueue.findUnique({
         where: {
            key,
         },
         include: {
            tasks: {
               orderBy: {
                  createdAt: 'desc',
               },
               include: {
                  jobs: {
                     where: {
                        category: !!category ? {
                           in: category
                        } : undefined,
                        priority
                     },
                     orderBy: {
                        priority: 'desc',
                     },
                  }
               }
            }
         }
      })

      return globalTasksQueue
   }

   /**
    * @description fill jobs for UNIT
    */

   private async fillUnitJobs() {
      if (this._jobs.length === 0) {

         const jobs = await this.prisma.globalTasksJobs.findMany({
            where: {
               category: {
                  in: ['INERTIA', 'RUNNING', 'STOPPED']
               },
               GlobalTasks: {
                  globalTasksQueueId: 'UNIT'
               }
            },
            orderBy: {
               priority: 'desc',
            },
         })

         const sortedJobs = [...jobs].sort((a, b) => {
            const _nA = this.taskCategoryValue(a.category)
            const _nB = this.taskCategoryValue(b.category)
            return _nB - _nA
         })
         this._jobs = [...sortedJobs];
      }
   }



   /**
    * @description get the current JOb to execute
    */

   getCurrentUnitJob() {
      if (!this._currentJob) {
         this._currentJob = this._jobs.shift();
         return;
      } else {
         if (this._currentJob.category === 'COMPLETED' || this._currentJob.category === 'ERROR') {
            this._currentJob = this._jobs.shift();
            return
         } else if (this._currentJob.category === 'RUNNING' || this._currentJob.category === 'STOPPED') {
            return;
         }
      }
   }


   /**
    * @description Execute order for unit jobs
    */

   private async executeUnitQueue() {
      if (!this._currentJob || !this._currentJob.globalTasksId) return;

      if (this.isExecutingTaskAtLimit()) {
         return;
      }



      const taskEngine = await this.task(this._currentJob.globalTasksId, 'UNIT');

      this.addExecutingTask();

      RunTaskFromUnitJob(this, {
         cacheCurrentJob: this._cacheCurrentJob,
         currentJob: this._currentJob,
         engine: taskEngine
      }).catch(() => false).finally(() => {
         this.endTaskUnit();
      })
   }


   private endTaskUnit() {
      this.subExecutingTask()
      this._currentJob = undefined;
      this._cacheCurrentJob = undefined;
   }


   /**
    * @description check if the executing task is at limit
    */

   isExecutingTaskAtLimit() {
      return this._executingTask >= GLOBAL_TASK_UNIT_PER_RUNNING
   }

   /**
    * @description update the executing task variable to add
    */

   private addExecutingTask() {
      this._executingTask = this._executingTask >= GLOBAL_TASK_UNIT_PER_RUNNING ? this._executingTask : this._executingTask + 1
   }

   /**
   * @description update the executing task variable to sub
   */

   private subExecutingTask() {
      this._executingTask = this._executingTask === 0 ? 0 : this._executingTask - 1
   }

}


