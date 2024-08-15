/**
 * @description This is the global task managment. It receives tasks from 'jobs' and so on,
 * and manage it to run at the best way possible
 */
import dotenv from 'dotenv'
dotenv.config()

import { GlobalTasksEngineQueue } from './engine/index'


/*
:--------------------------------------------------------------------------
: GlobalTask Constructors
:--------------------------------------------------------------------------
*/

declare global {
   namespace NodeJS {
      interface Global {
         tasks: GlobalTasksEngineQueue;
      }
   }
}

const globalTasks: GlobalTasksEngineQueue = global.tasks || new GlobalTasksEngineQueue()

if (process.env.NODE_ENV === 'development') global.tasks = globalTasks

export { globalTasks }
