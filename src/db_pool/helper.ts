/**
 *        @file helper.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Helper Class
 * @description Contains all DB helper functions.
 *   @functions - pool()
 *              - beginTransaction()
 *              - commitTransaction()
 *              - rollbackTransaction()
 *              - shallowCopy()
 */

import PGPool from './pg_pool'
import * as config from '../../config'

export class Helper {

   public static pool() {
      return new PGPool(config.dbObjProduction)
   }

   public static async beginTransaction(pool: PGPool) {
      const sql = 'BEGIN'
      try {
         return await pool.aquery(sql, [])
      } catch (error) {
         throw error
      }
   }

   public static async commitTransaction(pool: PGPool) {
      const sql = 'COMMIT'
      try {
         return await pool.aquery(sql, [])
      } catch (error) {
         throw error
      }
   }

   public static async rollbackTransaction(pool: PGPool, cUser: any) {
      const sql = 'ROLLBACK'
      try {
         return await pool.aquery(sql, [])
      } catch (error) {
         throw error
      }
   }

   public static shallowCopy(source: any, target: any) {
      Object.keys(target).forEach((key) => {
         if (source[key] !== undefined) {
            target[key] = source[key]
         }
      })

      return target
   }

}

export default Helper
