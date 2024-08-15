import { GlobalTasksJobs_AddLogProps, GlobalTasksJobs_JobsProps } from './../../../@types/globalTasks/index';
import { GlobalTasksEngineQueue } from './index'
import { GlobalTasks, GlobalTasksJobs, GlobalTasksQueueId, Prisma } from '@prisma/client'
import { GlobalTasksJobs_AddProps, GlobalTasksJobs_ReadProps, GlobalTasksJobs_UpdateProps } from '@/server/@types/globalTasks';
import { LogEngine } from '@/app/LogEngine';


/*
:--------------------------------------------------------------------------
: Setup of GlobalTask Engine
:--------------------------------------------------------------------------
*/

export class GlobalTasksEngine {

   queue: GlobalTasksEngineQueue
   key: string;
   _database?: GlobalTasks
   _currentJob?: GlobalTasksJobs
   props: Record<any, any>;
   log: LogEngine;

   /**
    * @constructor
    */

   constructor(queue: GlobalTasksEngineQueue, key: string) {
      this.queue = queue;
      this.key = key;
      this.props = {};
      this.log = new LogEngine({
         filename: key,
         folder: key
      });
   }

   /**
    * @description loads the database task
    */

   async upsertDatabase(key?: GlobalTasksQueueId) {
      this._database = await this.queue.prisma.globalTasks.upsert({
         where: {
            key: this.key
         },
         create: {
            key: this.key,
            GlobalTasksQueue: {
               connect: {
                  key: key ? key : 'UNIT'
               }
            },
            jobs: {
               createMany: {
                  data: []
               }
            }
         },
         update: {

         }
      })
   }

   /**
    * @description upsert a job, if there is some job that has not been completed, then use it
    */

   async commit({ category, priority, data }: GlobalTasksJobs_AddProps) {
      const job = await this.last({ category: 'STOPPED' });
      if (!job) {
         return await this.add({ category, priority, data })
      }
      this._currentJob = job;
      return this._currentJob
   }

   /**
    * @desc Adds a new job to the historic
    */

   async add({ priority, data, key }: GlobalTasksJobs_AddProps) {
      const job = await this.queue.prisma.globalTasksJobs.create({
         data: {
            GlobalTasks: {
               connect: {
                  key: this.key
               }
            },
            category: 'INERTIA',
            priority,
            data: JSON.stringify(data),
         }
      })
      this._currentJob = job;
      return job;
   }

   /**
    * Update the job
    */

   async update({ category, id, data }: GlobalTasksJobs_UpdateProps): Promise<boolean> {
      try {

         await this.queue.prisma.globalTasksJobs.update({
            where: {
               id: !id ? this._currentJob?.id : id
            },
            data: {
               category,
               data: JSON.stringify(data),
            }
         })

         return true;
      } catch (error) {
         console.error(error)
         return false;
      }
   }

   /**
    * @desc Get the list of jobs
   */

   async list({ category, priority, data, perPage, pageIndex }: GlobalTasksJobs_JobsProps) {
      const [jobs, total] = await this.queue.prisma.$transaction([
         this.queue.prisma.globalTasksJobs.findMany({
            where: {
               GlobalTasks: {
                  key: this.key
               },
               category,
               priority,
               data: JSON.stringify(data),
            },
            orderBy: {
               createdAt: 'desc'
            },
            skip: pageIndex,
            take: perPage
         }),
         this.queue.prisma.globalTasksJobs.count({
            where: {
               GlobalTasks: {
                  key: this.key
               }
            }
         })
      ])

      return {
         jobs,
         total
      }
   }

   /**
    * @desc Get the last one job
   */

   async last({ category = 'INERTIA', priority, data, id }: GlobalTasksJobs_ReadProps) {
      const job = await this.queue.prisma.globalTasksJobs.findFirst({
         where: {
            GlobalTasks: {
               key: this.key
            },
            category,
            priority,
            data: JSON.stringify(data),
            id
         },
         orderBy: {
            createdAt: 'desc'
         }
      })
      return job;
   }

   /**
    * @desc Execute the task while get the performance
    */

   async execute(method: (task: GlobalTasksEngine) => Promise<any>): Promise<boolean> {
      if (!this._database) return false;
      try {

         // start to monitor
         const timeStart = Date.now();
         const memoryStart = process.memoryUsage().heapUsed / 1024 / 1024;

         await method(this)

         // end the monitor
         const timeEnd = Date.now();
         const memoryEnd = process.memoryUsage().heapUsed / 1024 / 1024;



         const memoryDelta = +parseFloat(String(memoryStart / memoryEnd)).toFixed(3);
         const secondsElapsed = +parseFloat(
            String((timeEnd - timeStart) / 1000)
         ).toFixed(3);
         const timeDelta = parseFloat((memoryDelta / secondsElapsed).toFixed(7))


         await this.savePerformance({
            timeStart: new Date(timeStart),
            memoryStart,
            memoryEnd,
            timeEnd: new Date(timeEnd),
            timeDelta,
            memoryDelta,
            secondsElapsed
         })

         return true;
      } catch (error) {
         console.error(this.key, error)
         return false;
      }
   }

   /**
    * @description save the performace of the 'method' from 'execute'
    */

   private async savePerformance({
      memoryDelta,
      memoryEnd,
      memoryStart,
      secondsElapsed,
      timeDelta,
      timeEnd,
      timeStart
   }: Prisma.GlobalTasksJobsPerformanceCreateInput) {
      if (!this._currentJob) return

      const performance = await this.queue.prisma.globalTasksJobsPerformance.create({
         data: {
            GlobalTasksJobs: {
               connect: {
                  id: this._currentJob.id
               }
            },
            memoryDelta,
            memoryEnd,
            memoryStart,
            secondsElapsed,
            timeDelta,
            timeEnd,
            timeStart
         }
      })
   }

   /**
   * @desc Add a log into the currentJob
   */

   addLog({ code, message, isCritical }: GlobalTasksJobs_AddLogProps): boolean {
      if (!this._currentJob) return false;
      this.queue.prisma.globalTasksJobsLog.create({
         data: {
            code,
            message,
            isCritical,
            GlobalTasksJobs: {
               connect: {
                  id: this._currentJob.id
               }
            }
         }
      }).catch((error) => console.error(error))
      return true;
   }


}
