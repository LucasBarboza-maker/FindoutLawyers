import Redis, { RedisClient } from 'redis';
import { ConfigRedis } from './config';
import dotenv from 'dotenv';
dotenv.config();

declare global {
   namespace NodeJS {
      interface Global {
         redis: RedisClient;
      }
   }
}

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

let redis: RedisClient = global.redis || Redis.createClient({
   port: ConfigRedis.port,
   host: ConfigRedis.host,
});

if (process.env.NODE_ENV === 'production') {
   global.redis = redis;
}

export { redis };
