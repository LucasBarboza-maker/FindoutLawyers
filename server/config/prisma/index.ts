/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

/*
:--------------------------------------------------------------------------
: Default Config
:--------------------------------------------------------------------------
*/

declare global {
   namespace NodeJS {
      interface Global {
         prisma: PrismaClient;
      }
   }
}

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

const prisma: PrismaClient = global.prisma || new PrismaClient({
   log: [
      {
         emit: 'event',
         level: 'query',
      },
      {
         emit: 'event',
         level: 'info',
      },
      {
         emit: 'event',
         level: 'warn',
      },
      {
         emit: 'event',
         level: 'error',
      },
   ],
} as any)


if (process.env.NODE_ENV === 'development') global.prisma = prisma

export { prisma }
