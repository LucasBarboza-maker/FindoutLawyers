import { FastifyInstance } from 'fastify';
import { Server } from 'socket.io';

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

declare global {
   namespace NodeJS {
      interface Global {
         ws: Server;
      }
   }
}


let WebSocket: Server;

export async function ConfigWebsocket(
   fastify: FastifyInstance
): Promise<Server> {
   WebSocket = global.ws || new Server(fastify.server, {
      cors: {
         origin: '*',
      },
   });
   WebSocket.on('connection', async (socket) => {
      // console.log('WS ready to go');
   });
   global.socket = WebSocket;
   return WebSocket;
}


export { WebSocket }
