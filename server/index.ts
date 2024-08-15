/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import dotenv from 'dotenv';
import fastifyInstance from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyExpress from 'fastify-express';
import fastifyMulter from 'fastify-multer';
import fastifyStatic from 'fastify-static';
import fastifyRawBody from 'fastify-raw-body';
import path from 'path';
import DOMAIN_CONFIG from './config/domain';
import { prisma } from './config/prisma/index';
import { QueueRunner } from './config/queue/setup';
import { redis } from './config/redis/index';
import { ConfigWebsocket } from './config/ws/index';
import Bootstrap_Routes from './routes';
import { StartPoint } from './app/bootstrap';

/*
:--------------------------------------------------------------------------
: Constant
:--------------------------------------------------------------------------
*/

dotenv.config();

const ONLY_SERVER = process.env.ONLY_SERVER
    ? eval(process.env.ONLY_SERVER)
    : false;

/*
:--------------------------------------------------------------------------
: @bootstrap
:--------------------------------------------------------------------------
*/

void (async function () {
    /*
   :-----------------------------------------------------------------------
   : Handler
   :-----------------------------------------------------------------------
   */

    const fastify = fastifyInstance({
        logger: false,
        pluginTimeout: ONLY_SERVER ? 0 : 3e4,
    });

    /*
   :--------------------------------------------------------------------------
   : Register
   :--------------------------------------------------------------------------
   */

    await fastify.register(fastifyExpress);

    fastify.register(fastifyCors, {
        origin: true,
    });

    fastify.register(fastifyMulter.default.contentParser);

    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '..', 'uploads', 'public'),
        prefix: '/public/uploads/',
    });

    fastify.register(fastifyRawBody, {
        encoding: false,
        global: false,
    });

    /*
   :--------------------------------------------------------------------------
   : Setup Socket
   :--------------------------------------------------------------------------
   */

    const SocketServer = await ConfigWebsocket(fastify);

    /*
   :--------------------------------------------------------------------------
   : Bull Queues
   :--------------------------------------------------------------------------
   */

    await QueueRunner(fastify as any);

    /*
   :--------------------------------------------------------------------------
   : Routes
   :--------------------------------------------------------------------------
   */

    await Bootstrap_Routes({
        fastify,
        prisma,
        redis,
        socket: SocketServer,
    });

    /*
   :--------------------------------------------------------------------------
   : Server
   :--------------------------------------------------------------------------
   */

    try {
        await fastify.listen(DOMAIN_CONFIG.PORT);
        console.log(`goto http://localhost:${DOMAIN_CONFIG.PORT}/`);
        fastify.log.info(`server listening on ${DOMAIN_CONFIG.PORT}`);
        StartPoint({
            fastify,
            prisma,
            redis,
            socket: SocketServer,
        })
            .then(console.log)
            .catch(console.error);
    } catch (error) {
        await prisma.$disconnect();
        console.log({
            error,
        });
        fastify.log.error(error);
        process.exit(1);
    }
})();
