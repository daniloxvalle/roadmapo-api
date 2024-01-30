/**
 *        @file pg_pool.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary PGPool Class
 *   @functions - aquery()
 *              - connect()
 */

'use strict'

import pg from 'pg'

export default class PGPool {
   pool: pg.Pool

   constructor(dbConfig: pg.PoolConfig) {
      this.pool = new pg.Pool(dbConfig)

      this.pool.on('error', function (err: Error, _client: any) {
         console.log(`Idle-Client Error:\n${err.message}\n${err.stack}`)
      })
   }

   async aquery(sqlText: string, params: any[] = []): Promise<pg.QueryResult<any>> {
      const client = await this.pool.connect()
      try {
         const result = await client.query(sqlText, params)

         return result
      } catch (e) {
         throw e
      } finally {
         client.release()
      }
   }

   /**
    * Create a client using one of the pooled connections
    *
    * @return client
    */
   async connect(): Promise<pg.PoolClient> {
      const client = await this.pool.connect()
      return client
   }
}
