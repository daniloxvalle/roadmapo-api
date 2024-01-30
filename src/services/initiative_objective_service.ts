/**
 *        @file initiative_objective_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary InitiativeObjectiveService Class
 * @description Define Functions that perform CRUD operations on initiative__objective relation table
 *   @functions - getInitiativeObjective()
 *              - addInitiativeObjective()
 *              - deleteInitiativeObjective()
 */

import Helper from '../db_pool/helper'
import CommonService from './common_service'
import messages from '../constants'
import { InitiativeObjective } from 'src/models/initiative_objective'
import { Initiative } from 'src/models/initiative'

export class InitiativeObjectiveService extends CommonService {
   table_name = 'initiative__objective'

   public async getInitiativeObjective(uidFirebase: string, initiative: Initiative): Promise<any> {
      const sql = `SELECT 
            ${this.table_name}.id_product,
            ${this.table_name}.id_initiative,
            ${this.table_name}.id_objective
         FROM ${this.table_name}
         JOIN app_user ON ${this.table_name}.id_app_user = app_user.id
         WHERE app_user.uid_firebase = $1 
            AND ${this.table_name}.id_initiative = $2
         ORDER BY ${this.table_name}.id`
      let params = [uidFirebase, initiative.id]
      return this.getRows(sql, params)
   }

   public async addInitiativeObjective(uidFirebase: string, initiativeObjective: InitiativeObjective): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `INSERT INTO ${this.table_name} 
               (id_app_user,
               id_product,
               id_initiative, 
               id_objective)
            SELECT 
               id,
               $1,
               $2,
               $3
            FROM app_user WHERE uid_firebase = $4 RETURNING id`
         let params = [initiativeObjective.id_product, initiativeObjective.id_initiative, initiativeObjective.id_objective, uidFirebase]

         const initiativeObjectiveResult = await pool.aquery(sql, params)
         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.insert,
               id: initiativeObjectiveResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`InitiativeObjectiveService.addInitiativeObjective() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async deleteInitiativeObjective(uidFirebase: string, idInitiative: number, idObjective: number): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `DELETE FROM ${this.table_name}
            WHERE id_initiative = $1
               AND id_objective = $2
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $3)
            RETURNING id`
         let params = [idInitiative, idObjective, uidFirebase]

         const initiativeObjectiveResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.delete,
               id: initiativeObjectiveResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`InitiativeObjectiveService.updateInitiativeObjective() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

}

export default InitiativeObjectiveService
