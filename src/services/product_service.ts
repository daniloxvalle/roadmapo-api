/**
 *        @file product_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary ProductService Class
 * @description Define Functions that perform CRUD operations on products
 *   @functions - getProducts()
 *              - getProduct()
 *              - getProductPublication()
 *              - addProduct()
 *              - updateProduct()
 *              - deleteProduct()
 */

import Helper from '../db_pool/helper'
import { Product } from '../models/product'
import CommonService from './common_service'
import messages from '../constants'
import TimeframeService from './timeframe_service'
import InitiativeService from './initiative_service'
import SolutionService from './solution_service'
import PublicationService from './publication_service'

export class ProductService extends CommonService {
   table_name = 'product'

   public async getProducts(uidFirebase: string): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.name,
            ${this.table_name}.description,
            ${this.table_name}.vision,
            (SELECT COUNT(initiative.id) 
               FROM initiative 
               WHERE initiative.id_product = ${this.table_name}.id 
                  AND initiative.deleted = FALSE)
               as count_initiative,
            (SELECT COUNT(solution.id) 
               FROM solution 
               WHERE solution.id_product = ${this.table_name}.id 
                  AND solution.deleted = FALSE)
               as count_solution
         FROM ${this.table_name}
         JOIN app_user ON ${this.table_name}.id_app_user = app_user.id
         WHERE app_user.uid_firebase = $1 
            AND ${this.table_name}.deleted = FALSE
         ORDER BY ${this.table_name}.id`
      let params = [uidFirebase]

      return this.getRows(sql, params)
   }

   public async getProduct(uidFirebase: string, idProduct: number): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.name,
            ${this.table_name}.description,
            ${this.table_name}.vision
         FROM ${this.table_name} 
         JOIN app_user ON ${this.table_name}.id_app_user = app_user.id
         WHERE app_user.uid_firebase = $1 
         AND ${this.table_name}.id = $2 AND
         ${this.table_name}.deleted = FALSE`
      let params = [uidFirebase, idProduct]

      return this.getRows(sql, params)
   }

   public async getProductPublication(nanoid: string): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.name,
            ${this.table_name}.description,
            ${this.table_name}.vision
         FROM ${this.table_name} 
         JOIN publication ON ${this.table_name}.id = publication.id_product
         WHERE publication.nanoid = $1 
            AND ${this.table_name}.deleted = FALSE`
      let params = [nanoid]

      return this.getRows(sql, params)
   }

   public async addProduct(uidFirebase: string, product: Product): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `INSERT INTO ${this.table_name} 
            (id_app_user, 
            name, 
            description, 
            vision)
         SELECT id,
            $1,
            $2,
            $3
         FROM app_user WHERE uid_firebase = $4 RETURNING id`
         let params = [product.name, product.description, product.vision, uidFirebase]

         const productResult = await pool.aquery(sql, params)
         await Helper.commitTransaction(pool)

         const idProduct = productResult.rows[0].id
         console.log('idProduct: ', idProduct)
         const timeframeService: TimeframeService = new TimeframeService()
         const timeframeResponse = await timeframeService.addFirstTimeframes(uidFirebase, idProduct)
         if (timeframeResponse.success) {
            const idTimeframe = timeframeResponse.data.id
            console.log('idTimeframe: ', idTimeframe)
            const initiativeService: InitiativeService = new InitiativeService()
            const initiativeResponse = await initiativeService.addFirstInitiative(uidFirebase, idProduct, idTimeframe)
            if (initiativeResponse.success) {
               const idInitiative = initiativeResponse.data.id
               console.log('idInitiative: ', idInitiative)
               const solutionService: SolutionService = new SolutionService()
               const solutionResponse = await solutionService.addFirstSolution(uidFirebase, idProduct, idInitiative)
               if (solutionResponse.success) {
                  const publicationService: PublicationService = new PublicationService()
                  const publicationResponse = await publicationService.addFirstPublication(uidFirebase, idProduct)
                  console.log('idPublication: ', publicationResponse.data.id)
                  // return publicationResponse
                  return {
                     success: true,
                     data: {
                        message: messages.success.insert,
                        id: productResult.rows[0].id,
                     },
                  }
               }
            }
         }
      } catch (error) {
         console.log(`ProductService.addProduct() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async addFirstProduct(uid_firebase: string): Promise<any> {
      const newProduct: Product = new Product()

      newProduct.name = 'My Product'
      newProduct.description = 'My product description.'
      newProduct.vision = 'My product vision.'

      return this.addProduct(uid_firebase, newProduct)
   }

   public async updateProduct(uidFirebase: string, product: Product): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET name = $1, 
               description = $2, 
               vision = $3 
            WHERE id = $4 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $5) 
            RETURNING id`
         let params = [product.name, product.description, product.vision, product.id, uidFirebase]

         const productResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.update,
               id: productResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`ProductService.updateProduct() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async deleteProduct(uidFirebase: string, idProduct: number): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET deleted = true 
            WHERE id = $1 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $2) 
            RETURNING id`
         let params = [idProduct, uidFirebase]

         const productResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.delete,
               id: productResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`ProductService.updateProduct() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async generateDescriptionAI(uidFirebase: string, product: Product): Promise<any> {
      try {
         // Allow AI use without authentication
         // const sql = `SELECT app_user.id 
         // FROM app_user
         // WHERE app_user.uid_firebase = $1`
         // let params = [uidFirebase]
         // const result = this.getRows(sql, params)

         // if ((await result).success) {
         const prompt = `Act as a product manager, create a description for a product with the following name: ${product.name}.
            The product description should have at most 40 words, and should explean what the product is, what the target customer is, and what the product does.`
         const completion = await this.openAIConfiguration().createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "assistant", content: prompt }],
            max_tokens: 400,
            temperature: 1.4,
         })
         return {
            success: true,
            data: completion.data
         }
         // } else {
         //    return { success: false, data: { message: "User not found." } }
         // }
      } catch (error) {
         console.log(`ProductService.generateDescriptionAI() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async generateVisionAI(uidFirebase: string, product: Product): Promise<any> {
      try {
         // const sql = `SELECT app_user.id 
         // FROM app_user
         // WHERE app_user.uid_firebase = $1`
         // let params = [uidFirebase]
         // const result = this.getRows(sql, params)

         // if ((await result).success) {
         const prompt = `Act as a product manager, create in one phrase the product vision for the following product.
            Product name: ${product.name}, product description: ${product.description}.`

         const completion = await this.openAIConfiguration().createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "assistant", content: prompt }],
            max_tokens: 300,
            temperature: 1.4,
            n: 1,
         })

         return {
            success: true,
            data: completion.data
         }
         // } else {
         //    return { success: false, data: { message: "User not found." } }
         // }
      } catch (error) {
         console.log(`ProductService.generateVisionAI() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

}

export default ProductService
