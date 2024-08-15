import { PrismaClient } from '@prisma/client';

/*
:--------------------------------------------------------------------------
: Setup of the database using Redis and Prisma
:--------------------------------------------------------------------------
*/

export async function GlobalTasks_ConfigDefaults_Database(prisma: PrismaClient) {


   const unitQueue = await prisma.globalTasksQueue.upsert({
      where: {
         key: 'UNIT'
      },
      create: {
         key: 'UNIT',
         tasks: {
            createMany: {
               data: []
            }
         }
      },
      update: {

      }
   })

   const parallelQueue = await prisma.globalTasksQueue.upsert({
      where: {
         key: 'PARALLEL'
      },
      create: {
         key: 'PARALLEL',
         tasks: {
            createMany: {
               data: []
            }
         }
      },
      update: {

      }
   })

}
