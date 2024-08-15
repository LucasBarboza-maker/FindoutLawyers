import { IBootstrap_Routes } from '@/types/routes';
import * as Routes from './routes';

/*
:--------------------------------------------------------------------------
: Bootstrap routes
:--------------------------------------------------------------------------
*/

export default async function Bootstrap_Routes({
   fastify,
   prisma,
   redis,
   socket,
}: IBootstrap_Routes) {
   const overallRoutes: Record<string | symbol, any>[] = Object.values(Routes);
   return overallRoutes.map((routes) =>
      Object.values(routes).map(
         (route) => !!route && route({ fastify, prisma, redis, socket })
      )
   );
}
