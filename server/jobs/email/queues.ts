import { Queue } from 'bullmq';
import { ConfigRedis, RedisKey } from '@/config/redis/config';

export const QUEUE_NAME = RedisKey('EMAIL');

const EmailQueue = new Queue(QUEUE_NAME, {
   connection: {
      host: ConfigRedis.host,
      port: ConfigRedis.port,
   },
});

export { EmailQueue };
