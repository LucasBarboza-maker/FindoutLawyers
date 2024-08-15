
/**
 * @description Built up cache singleton
 * @example
 * export const prisma = singleton('prisma', () => {
 *    return new PrismaClient()
 * })
 */
export const SingletonInstance = <T>(id: string, fn: () => T) => {
   if (process.env.NODE_ENV === 'production') {
      return fn()
   } else {
      if (!global[id]) {
         global[id] = fn()
      }
      return global[id] as T
   }
}
