import { ENV } from '@/config/env';

/*
:--------------------------------------------------------------------------
: Const
:--------------------------------------------------------------------------
*/

interface IConfigRedis {
    host: string;
    port: number | undefined;
}

const REDIS_HOST = ENV.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = ENV.REDIS_PORT || 6379;

export function RedisKey(key: string): string {
    return `findoutlawyers/${key}`;
}

/*
:--------------------------------------------------------------------------
: Bootstrap
:--------------------------------------------------------------------------
*/

const ConfigRedis: IConfigRedis = {
    host: REDIS_HOST,
    port: +REDIS_PORT,
};

export { ConfigRedis };
