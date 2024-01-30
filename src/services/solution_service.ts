/**
 *        @file solution_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary SolutionService Class
 * @description Define Functions that perform CRUD operations on solutions
 *   @functions - getSolutions()
 *              - addSolution()
 *              - updateSolution()
 *              - deleteSolution()
 */

import Helper from '../db_pool/helper'
import { Solution } from '../models/solution'
import CommonService from './common_service'
import messages from '../constants'
import { forEach } from 'lodash'

export class SolutionService extends CommonService {
   table_name = 'solution'

   public async getSolutions(uidFirebase: string, idProduct: number): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_product,
            ${this.table_name}.id_initiative,
            ${this.table_name}.id_solution_status,
            ${this.table_name}.id_parent_solution,
            ${this.table_name}.name,
            ${this.table_name}.description,
            ${this.table_name}.is_parent,
            ${this.table_name}.rank
         FROM ${this.table_name}
         JOIN app_user ON ${this.table_name}.id_app_user = app_user.id
         WHERE app_user.uid_firebase = $1 
            AND ${this.table_name}.id_product = $2
            AND ${this.table_name}.deleted = FALSE
         ORDER BY ${this.table_name}.rank`
      let params = [uidFirebase, idProduct]

      return this.getRows(sql, params)
   }

   public async getSolutionsPublication(nanoid: string): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_product,
            ${this.table_name}.id_initiative,
            ${this.table_name}.id_solution_status,
            ${this.table_name}.id_parent_solution,
            ${this.table_name}.name,
            ${this.table_name}.description,
            ${this.table_name}.is_parent,
            ${this.table_name}.rank
         FROM ${this.table_name}
         JOIN publication ON publication.nanoid = $1 
         WHERE ${this.table_name}.id_product = publication.id_product 
            AND ${this.table_name}.deleted = FALSE
         ORDER BY ${this.table_name}.rank`
      let params = [nanoid]

      return this.getRows(sql, params)
   }

   public async addSolution(uidFirebase: string, solution: Solution): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `INSERT INTO ${this.table_name} 
            (id_app_user, 
            id_product, 
            id_initiative, 
            id_solution_status, 
            id_parent_solution, 
            name, 
            description,
            is_parent,
            rank)
         SELECT 
            id,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8 
         FROM app_user WHERE uid_firebase = $9 RETURNING id`
         let params = [solution.id_product, solution.id_initiative, solution.id_solution_status, solution.id_parent_solution, solution.name, solution.description, solution.is_parent, solution.rank, uidFirebase]

         const solutionResult = await pool.aquery(sql, params)
         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.insert,
               id: solutionResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`SolutionService.addSolution() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async addFirstSolution(uid_firebase: string, idProduct: number, idInitiative: number): Promise<any> {
      const newSolution: Solution = new Solution()

      newSolution.id_product = idProduct
      newSolution.id_initiative = idInitiative
      newSolution.id_solution_status = 1
      newSolution.name = 'My First Solution'
      newSolution.description = 'My solution user story.'
      newSolution.is_parent = false
      newSolution.rank = "0|hzzzzz"

      const solutionResponse = await this.addSolution(uid_firebase, newSolution)

      return solutionResponse
   }

   public async updateSolution(uidFirebase: string, solution: Solution): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET id_initiative = $1, 
               id_solution_status = $2, 
               id_parent_solution = $3, 
               name = $4, 
               description = $5, 
               is_parent = $6, 
               rank = $7 
            WHERE id = $8 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $9) 
            RETURNING id`
         let params = [solution.id_initiative, solution.id_solution_status, solution.id_parent_solution, solution.name, solution.description, solution.is_parent, solution.rank, solution.id, uidFirebase]

         const solutionResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.update,
               id: solutionResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`SolutionService.updateSolution() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async deleteSolution(uidFirebase: string, idSolution: number): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET deleted = true
            WHERE id = $1
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $2) 
            RETURNING id`
         let params = [idSolution, uidFirebase]

         const solutionResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.delete,
               id: solutionResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`SolutionService.updateSolution() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async generateNameAI(uidFirebase: string, initiativeId: number): Promise<any> {
      try {
         const sql =
            `SELECT initiative.name as initiative_name,
               initiative.description as initiative_description,
               product.name as product_name,
               product.description as product_description,
               jsonb_agg(objective) filter (where objective.id is not null) as objectives
            FROM initiative
            JOIN app_user ON initiative.id_app_user = app_user.id
            JOIN product ON initiative.id_product= product.id
            LEFT JOIN initiative__objective ON initiative.id = initiative__objective.id_initiative
            LEFT JOIN objective ON initiative__objective.id_objective = objective.id	
            WHERE app_user.uid_firebase = $1 
               AND initiative.id= $2
            GROUP BY initiative.id, product.id`

         let params = [uidFirebase, initiativeId]
         const result = this.getRows(sql, params)
         const promptParams = (await result).data.result[0]

         if ((await result).success) {
            let promptObjectives = ''
            forEach(promptParams.objectives, (objective, index: number) =>
               promptObjectives = promptObjectives + `Objective ${index + 1}: ${objective.name}. `
            )

            const prompt = `Act as a product manager and propose a feature or solution in one phrase to support the following initiatite. 
               Initiative name: ${promptParams.initiative_name}.
               Initiative description: ${promptParams.initiative_description}. 
               The feature goal is to achieve one of the following objectives:${promptObjectives}
               For the following product.
               Product name: ${promptParams.product_name}.
               Product description: ${promptParams.product_description}.
               The feature name should should not contain the objective name or the product name.
               The feature name should have at most 16 words and should describe what the feature is, it should not a have a title.
               Never use double quotes.
               Use the format: [feature name].`

            const completion = await this.openAIConfiguration().createChatCompletion({
               model: "gpt-3.5-turbo",
               messages: [{ role: "assistant", content: prompt }],
               max_tokens: 300,
               temperature: 1.5,
               n: 1,
               stop: ["\n"],
            })
            return {
               success: true,
               data: completion.data
            }
         } else {
            return { success: false, data: { message: "User not found." } }
         }
      } catch (error) {
         console.log(`SolutionService.generateDescriptionAI() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async generateDescriptionAI(uidFirebase: string, name: string): Promise<any> {
      try {
         // const sql = `SELECT app_user.id 
         // FROM app_user
         // WHERE app_user.uid_firebase = $1`
         // let params = [uidFirebase]
         // const result = this.getRows(sql, params)

         // if ((await result).success) {
         const prompt = `Act as a product owner, generate a user story, definition of done and acceptance criteria for the following user story title: ${name}.
            The user story should have at most 140 words.
            Separate the definition of done as a numberded list, generate at most 4 definitions of done.
            Separate the acceptance criterias as a numberded list, generate at most 5 acceptance criterias.
            The user story should not begin with a title.`
         const completion = await this.openAIConfiguration().createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "assistant", content: prompt }],
            max_tokens: 500,
            temperature: 0.6,
         })
         return {
            success: true,
            data: completion.data
         }
         // } else {
         //    return { success: false, data: { message: "User not found." } }
         // }
      } catch (error) {
         console.log(`SolutionService.generateDescriptionAI() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

}

export default SolutionService
