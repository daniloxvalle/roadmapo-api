/**
 *        @file timeframe_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary TimeframeService Class
 * @description Define Functions that perform CRUD operations on timeframe
 *   @functions - getTimeframe()
 *              - addTimeframe()
 *              - updateTimeframe()
 *              - deleteTimeframe()
 */

import Helper from '../db_pool/helper'
import { Timeframe } from '../models/timeframe'
import CommonService from './common_service'
import messages from '../constants'

export class TimeframeService extends CommonService {
   table_name = 'timeframe'

   public async getTimeframe(uidFirebase: string, idProduct: number): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_product,
            ${this.table_name}.name,
            ${this.table_name}.summary,
            ${this.table_name}.is_archived
         FROM ${this.table_name}
         JOIN app_user ON ${this.table_name}.id_app_user = app_user.id
         WHERE app_user.uid_firebase = $1 
            AND ${this.table_name}.id_product = $2
            AND ${this.table_name}.deleted = FALSE
         ORDER BY ${this.table_name}.id`
      let params = [uidFirebase, idProduct]

      return this.getRows(sql, params)
   }

   public async getTimeframePublication(nanoid: string): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_product,
            ${this.table_name}.name,
            ${this.table_name}.summary,
            ${this.table_name}.is_archived
         FROM ${this.table_name}
         JOIN publication ON publication.nanoid = $1 
         WHERE ${this.table_name}.id_product = publication.id_product 
            AND ${this.table_name}.deleted = FALSE 
            AND ${this.table_name}.is_archived = FALSE
         ORDER BY ${this.table_name}.id`
      let params = [nanoid]

      return this.getRows(sql, params)
   }

   public async addTimeframe(uidFirebase: string, timeframe: Timeframe): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `INSERT INTO ${this.table_name} 
            (id_app_user, 
            id_product, 
            name, 
            summary, 
            is_archived)
         SELECT 
            id,
            $1,
            $2,
            $3,
            $4
         FROM app_user WHERE uid_firebase = $5 RETURNING id`
         let params = [timeframe.id_product, timeframe.name, timeframe.summary, timeframe.is_archived, uidFirebase]

         const timeframeResult = await pool.aquery(sql, params)
         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.insert,
               id: timeframeResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`TimeframeService.addTimeframe() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async addFirstTimeframes(uid_firebase: string, idProduct: number): Promise<any> {
      const newTimeframe: Timeframe = new Timeframe()

      newTimeframe.id_product = idProduct
      newTimeframe.is_archived = false

      newTimeframe.name = 'Now'
      newTimeframe.summary = 'Clear and well-defined items that are being worked on.'
      const timeframeResponse = await this.addTimeframe(uid_firebase, newTimeframe)

      newTimeframe.name = 'Next'
      newTimeframe.summary = 'Near future items that are in discovery or being validated.'
      await this.addTimeframe(uid_firebase, newTimeframe)

      newTimeframe.name = 'Later'
      newTimeframe.summary = 'Unclear opportunities to be explored in the future.'
      await this.addTimeframe(uid_firebase, newTimeframe)

      return timeframeResponse
   }

   public async updateTimeframe(uidFirebase: string, timeframe: Timeframe): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET name = $1, 
               summary = $2, 
               is_archived = $3 
            WHERE id = $4 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $5) 
            RETURNING id`
         let params = [timeframe.name, timeframe.summary, timeframe.is_archived, timeframe.id, uidFirebase]

         const timeframeResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.update,
               id: timeframeResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`TimeframeService.updateTimeframe() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async deleteTimeframe(uidFirebase: string, idTimeframe: number): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET deleted = true
            WHERE id = $1 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $2) 
            RETURNING id`
         let params = [idTimeframe, uidFirebase]

         const timeframeResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.delete,
               id: timeframeResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`TimeframeService.updateTimeframe() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

}

export default TimeframeService
