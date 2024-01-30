/**
 *        @file objective_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary ObjectiveService Class
 * @description Define Functions that perform CRUD operations on objectives
 *   @functions - getObjectives()
 *              - addObjective()
 *              - updateObjective()
 *              - deleteObjective()
 */

import Helper from '../db_pool/helper'
import { Objective } from '../models/objective'
import CommonService from './common_service'
import messages from '../constants'

export class ObjectiveService extends CommonService {
   table_name = 'objective'

   public async getObjectives(uidFirebase: string, idProduct: number): Promise<any> {
      // id_app_user was added for compatibility with the objectives in a initiative
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_app_user,
            ${this.table_name}.id_product,
            ${this.table_name}.name,
            ${this.table_name}.color
         FROM ${this.table_name}
         JOIN app_user ON ${this.table_name}.id_app_user = app_user.id
         WHERE app_user.uid_firebase = $1 
            AND ${this.table_name}.id_product = $2 
         ORDER BY ${this.table_name}.id`
      let params = [uidFirebase, idProduct]

      return this.getRows(sql, params)
   }

   public async getObjectivesPublication(nanoid: string): Promise<any> {
      // id_app_user was added for compatibility with the objectives in a initiative
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_app_user,
            ${this.table_name}.id_product,
            ${this.table_name}.name,
            ${this.table_name}.color
         FROM ${this.table_name}
         JOIN publication ON publication.nanoid = $1 
         WHERE ${this.table_name}.id_product = publication.id_product 
         ORDER BY ${this.table_name}.id`
      let params = [nanoid]

      return this.getRows(sql, params)
   }

   public async addObjective(uidFirebase: string, objective: Objective): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `INSERT INTO ${this.table_name} 
            (id_app_user, 
            id_product,
            name, 
            color)
         SELECT 
            id,
            $1,
            $2,
            $3 
         FROM app_user WHERE uid_firebase = $4 RETURNING id`
         let params = [objective.id_product, objective.name, objective.color, uidFirebase]

         const objectiveResult = await pool.aquery(sql, params)
         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.insert,
               id: objectiveResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`ObjectiveService.addObjective() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async updateObjective(uidFirebase: string, objective: Objective): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET name = $1, 
               color = $2 
            WHERE id = $3 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $4) 
            RETURNING id`
         let params = [objective.name, objective.color, objective.id, uidFirebase]

         const objectiveResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.update,
               id: objectiveResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`ObjectiveService.updateObjective() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async deleteObjective(uidFirebase: string, idObjective: number): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `DELETE FROM ${this.table_name}
            WHERE id = $1 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $2) 
            RETURNING id`
         let params = [idObjective, uidFirebase]

         const objectiveResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.delete,
               id: objectiveResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`ObjectiveService.updateObjective() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

}

export default ObjectiveService
