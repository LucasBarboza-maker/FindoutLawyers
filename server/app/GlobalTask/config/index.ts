import { UtilsTime } from '@/libraries/utils';

/*
:--------------------------------------------------------------------------
: GlobalTask Variables of Configuration
:--------------------------------------------------------------------------
*/

/**
 * @const GLOBAL_TASK_MAX_MEMORY_ALLOWED
 * @description Maximum allowed of memory ram
 */
export const GLOBAL_TASK_MAX_MEMORY_ALLOWED: string = '300 M'

/**
 * @const GLOBAL_TASK_UNIT_PER_RUNNING
 * @description Jobs per unit to be executed
 */
export const GLOBAL_TASK_UNIT_PER_RUNNING: number = 1;

/**
 * @const GLOBAL_TASK_PARALLEL_PER_RUNNING
 * @description Jobs per parallel to be executed
 */
export const GLOBAL_TASK_PARALLEL_PER_RUNNING: number = 9;

/**
 * @const GLOBAL_TASK_TIMEOUT_IN_SEC_TO_CHECKOUT
 * @description Time in seconds to execute the job that will check the list of
 * thins that needs to be executed
 */
export const GLOBAL_TASK_TIMEOUT_IN_SEC_TO_CHECKOUT = UtilsTime.secToMs(10)

/**
 * @const GLOBAL_TASK_PARALLEL_TIMEOUT_IN_SEC_TO_CHECKOUT
 * @description Time in seconds to execute the job that will check the list of
 * thins that needs to be executed
 */
export const GLOBAL_TASK_PARALLEL_TIMEOUT_IN_SEC_TO_CHECKOUT = UtilsTime.secToMs(10)
