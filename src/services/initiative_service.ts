/**
 *        @file initiative_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary InitiativeService Class
 * @description Define Functions that perform CRUD operations on initiatives
 *   @functions - getInitiatives()
 *              - addInitiative()
 *              - updateInitiative()
 *              - deleteInitiative()
 */

import { forEach } from 'lodash'

import Helper from '../db_pool/helper'
import { Initiative } from '../models/initiative'
import CommonService from './common_service'
import messages from '../constants'

export class InitiativeService extends CommonService {
   table_name = 'initiative'

   public async getInitiatives(uidFirebase: string, idProduct: number): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_product,
            ${this.table_name}.id_parent_initiative,
            ${this.table_name}.id_timeframe,
            ${this.table_name}.generation,
            ${this.table_name}.name,
            ${this.table_name}.description,
            ${this.table_name}.rank,
            jsonb_agg(objective) filter (where objective.id is not null) as objectives
         FROM ${this.table_name}
         JOIN app_user ON ${this.table_name}.id_app_user = app_user.id
         LEFT JOIN initiative__objective ON ${this.table_name}.id = initiative__objective.id_initiative
         LEFT JOIN objective ON initiative__objective.id_objective = objective.id	
         WHERE app_user.uid_firebase = $1 
            AND ${this.table_name}.id_product = $2
            AND ${this.table_name}.deleted = FALSE
         GROUP BY initiative.id
         ORDER BY ${this.table_name}.rank`
      let params = [uidFirebase, idProduct]
      return this.getRows(sql, params)
   }

   public async getInitiativesPublication(nanoid: string): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_product,
            ${this.table_name}.id_parent_initiative,
            ${this.table_name}.id_timeframe,
            ${this.table_name}.generation,
            ${this.table_name}.name,
            ${this.table_name}.description,
            ${this.table_name}.rank,
            jsonb_agg(objective) filter (where objective.id is not null) as objectives
         FROM ${this.table_name}
         JOIN publication ON publication.nanoid = $1 
         LEFT JOIN initiative__objective ON ${this.table_name}.id = initiative__objective.id_initiative
         LEFT JOIN objective ON initiative__objective.id_objective = objective.id	
         WHERE ${this.table_name}.id_product = publication.id_product
            AND ${this.table_name}.deleted = FALSE
         GROUP BY initiative.id
         ORDER BY ${this.table_name}.rank`
      let params = [nanoid]
      return this.getRows(sql, params)
   }

   public async addInitiative(uidFirebase: string, initiative: Initiative): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `INSERT INTO ${this.table_name} 
            (id_app_user, 
            id_product, 
            id_parent_initiative, 
            id_timeframe, 
            generation, 
            name, 
            description,
            rank)
         SELECT 
            id,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7 
         FROM app_user WHERE uid_firebase = $8 RETURNING id`
         let params = [initiative.id_product, initiative.id_parent_initiative, initiative.id_timeframe, initiative.generation, initiative.name, initiative.description, initiative.rank, uidFirebase]

         const initiativeResult = await pool.aquery(sql, params)
         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.insert,
               id: initiativeResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`InitiativeService.addInitiative() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async addFirstInitiative(uid_firebase: string, idProduct: number, idTimeframe: number): Promise<any> {
      const newInitiative: Initiative = new Initiative()

      newInitiative.id_product = idProduct
      newInitiative.id_timeframe = idTimeframe
      newInitiative.generation = 1
      newInitiative.rank = "0|hzzzzz"
      newInitiative.name = 'My First Initiative'
      newInitiative.description = 'My initiative story.'

      const initiativeResponse = await this.addInitiative(uid_firebase, newInitiative)

      return initiativeResponse
   }

   public async updateInitiative(uidFirebase: string, initiative: Initiative): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET id_parent_initiative = $1, 
               id_timeframe = $2, 
               generation = $3, 
               name = $4, 
               description = $5, 
               rank = $6 
            WHERE id = $7
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $8) 
            RETURNING id`
         let params = [initiative.id_parent_initiative, initiative.id_timeframe, initiative.generation, initiative.name, initiative.description, initiative.rank, initiative.id, uidFirebase]

         const initiativeResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.update,
               id: initiativeResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`InitiativeService.updateInitiative() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async deleteInitiative(uidFirebase: string, idInitiative: number): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET deleted = true
            WHERE id = $1 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $2) 
            RETURNING id`
         let params = [idInitiative, uidFirebase]

         const initiativeResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.delete,
               id: initiativeResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`InitiativeService.deleteInitiative() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async generateNameAI(uidFirebase: string, idProduct: number): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)
      try {
         //TODO: implement a way to disable an objective
         const sql =
            `SELECT product.name as product_name,
               product.description as product_description,
               jsonb_agg(objective) filter (where objective.id is not null) as objectives
            FROM product
            JOIN app_user ON product.id_app_user = app_user.id
            LEFT JOIN objective ON product.id = objective.id_product
            WHERE app_user.uid_firebase = $1 
               AND product.id= $2
            GROUP BY product.id`

         let params = [uidFirebase, idProduct]
         const result = this.getRows(sql, params)
         const promptParams = (await result).data.result[0]

         if ((await result).success) {
            let promptObjectives = ''
            forEach(promptParams.objectives, (objective, index: number) =>
               promptObjectives = promptObjectives + `Objective ${index + 1}: ${objective.name}. `
            )

            const prompt = `Act as a product manager and propose one initiative or opportunity.
            For the following product name: ${promptParams.product_name}.
            With the following product description: ${promptParams.product_description}.
            The initiative name should be a single sentence with at most 9 words and should not contain the objective name or the product name.
            The initiative goal is to achieve one of the following objectives:${promptObjectives}. 
            The objetive name should by write exactly as it is in the following objectives list: ${promptObjectives}.
            Provide it in JSON format, without trailing comma, only with the following 2 keys: initiative_name, objective_name.
            Do not add other information to the JSON.`

            const completion = await this.openAIConfiguration().createChatCompletion({
               model: "gpt-3.5-turbo",
               messages: [{ role: "assistant", content: prompt }],
               max_tokens: 300,
               temperature: 1.5,
               n: 1,
            })

            return {
               success: true,
               data: completion.data
            }
         } else {
            return { success: false, data: { message: "User not found." } }
         }
      } catch (error) {
         console.log(`InitiativeService.generateNameAI() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async generateDescriptionAI(uidFirebase: string, initiative: Initiative): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)
      try {
         //TODO: implement a way to disable an objective
         const sql =
            `SELECT product.name as product_name,
               product.description as product_description
            FROM product
            JOIN app_user ON product.id_app_user = app_user.id
            WHERE app_user.uid_firebase = $1 
               AND product.id= $2
            GROUP BY product.id`

         let params = [uidFirebase, initiative.id_product]
         const result = this.getRows(sql, params)
         const promptParams = (await result).data.result[0]

         if ((await result).success) {
            let promptObjectives = ''
            forEach(initiative.objectives, (objective, index: number) =>
               promptObjectives = promptObjectives + `Objective ${index + 1}: ${objective.name}. `
            )

            const prompt = `Act as a product manager and generate an initiative description for the following initiative name: ${initiative.name}.
            For the following product name: ${promptParams.product_name}.
            With the following product description: ${promptParams.product_description}.
            The initiative description should have at most 100 words.
            The initiative goal is to achieve one of the following objectives: ${initiative.objectives}.
            Provide it as a text without title, preferably use more then one paragraph.`

            const completion = await this.openAIConfiguration().createChatCompletion({
               model: "gpt-3.5-turbo",
               messages: [{ role: "assistant", content: prompt }],
               max_tokens: 500,
               temperature: 1.2,
               n: 1,
            })

            return {
               success: true,
               data: completion.data
            }
         } else {
            return { success: false, data: { message: "User not found." } }
         }
      } catch (error) {
         console.log(`InitiativeService.generateDescriptionAI() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

}

export default InitiativeService
