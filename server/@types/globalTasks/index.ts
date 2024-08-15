import { GlobalTasksEngine } from "@/app/GlobalTask/engine/task";
import { GlobalTasksJobsCategory, GlobalTasksQueueId } from "@prisma/client";
import { Job } from "bullmq";

export interface GlobalTasksJobs_DataContext {
   code: string;
   method: string;
   data: Record<any, any>;
}

export interface GlobalTasksJobs_AddProps {
   category: GlobalTasksJobsCategory
   priority: number;
   data: GlobalTasksJobs_DataContext;
   key?: GlobalTasksQueueId
}

export interface GlobalTasksJobs_JobsProps {
   category?: GlobalTasksJobsCategory
   priority?: number;
   data?: GlobalTasksJobs_DataContext;
   perPage?: number;
   pageIndex?: number;
}

export interface GlobalTasksJobs_UpdateProps {
   category?: GlobalTasksJobsCategory
   data?: GlobalTasksJobs_DataContext;
   id?: number;
}


export interface GlobalTasksJobs_ReadProps {
   category?: GlobalTasksJobsCategory
   priority?: number;
   data?: GlobalTasksJobs_DataContext;
   id?: number;
}

export interface GlobalTasksJobs_AddLogProps {
   code: string;
   message: string;
   isCritical?: boolean;
}

export interface GlobalTaskJobs_TaskContext {
   Task: (engine?: GlobalTasksEngine) => Promise<boolean>;
   Queue: (job?: Job) => Promise<boolean>
}
