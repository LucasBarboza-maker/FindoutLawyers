import { UtilsTime } from '@/libraries/utils';
import { EmailQueue } from './queues';

export function InitQueues() {
    // EmailQueue.add(
    //       'Crawler',
    //       {},
    //       {
    //           priority: 3,
    //           repeat: {
    //               every: UtilsTime.monthToMs(1),
    //               prevMillis: 0,
    //               count: 1,
    //               limit: undefined,
    //           },
    //           attempts: 2,
    //           delay: 0,
    //       }
    //   );
}
