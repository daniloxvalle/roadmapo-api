/**
 *        @file publication_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary PublicationService Class
 * @description Define Functions that perform CRUD operations on publication
 *   @functions - getPublication()
 *              - addPublication()
 *              - updatePublication()
 *              - deletePublication()
 */

import { nanoid } from 'nanoid'

import Helper from '../db_pool/helper'
import { Publication } from '../models/publication'
import CommonService from './common_service'
import messages from '../constants'

export class PublicationService extends CommonService {
   table_name = 'publication'

   public async getPublication(uidFirebase: string, idProduct: number): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_product,
            ${this.table_name}.nanoid,
            ${this.table_name}.name,
            ${this.table_name}.disclaimer,
            ${this.table_name}.theme,
            ${this.table_name}.is_name_visible,
            ${this.table_name}.is_vision_visible,
            ${this.table_name}.is_solution_visible,
            ${this.table_name}.is_objective_visible,
            ${this.table_name}.is_disclaimer_visible 
         FROM ${this.table_name}
         JOIN app_user ON ${this.table_name}.id_app_user = app_user.id
         WHERE app_user.uid_firebase = $1 
            AND ${this.table_name}.id_product = $2 
         ORDER BY ${this.table_name}.id`
      let params = [uidFirebase, idProduct]

      return this.getRows(sql, params)
   }

   public async getPublicationPublication(nanoid: string): Promise<any> {
      const sql = `SELECT ${this.table_name}.id,
            ${this.table_name}.id_product,
            ${this.table_name}.nanoid,
            ${this.table_name}.name,
            ${this.table_name}.disclaimer,
            ${this.table_name}.theme,
            ${this.table_name}.is_name_visible,
            ${this.table_name}.is_vision_visible,
            ${this.table_name}.is_solution_visible,
            ${this.table_name}.is_objective_visible,
            ${this.table_name}.is_disclaimer_visible 
         FROM ${this.table_name} 
         WHERE ${this.table_name}.nanoid = $1 
         ORDER BY ${this.table_name}.id`
      let params = [nanoid]

      return this.getRows(sql, params)
   }

   public async addPublication(uidFirebase: string, publication: Publication): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `INSERT INTO ${this.table_name} 
            (id_app_user, 
            id_product, 
            nanoid, 
            name, 
            disclaimer, 
            theme, 
            is_name_visible, 
            is_vision_visible, 
            is_solution_visible, 
            is_objective_visible, 
            is_disclaimer_visible)
         SELECT 
            id,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10 
         FROM app_user WHERE uid_firebase = $11 RETURNING id`
         let params = [publication.id_product, publication.nanoid, publication.name, publication.disclaimer, publication.theme, publication.is_name_visible,
         publication.is_vision_visible, publication.is_solution_visible, publication.is_objective_visible, publication.is_disclaimer_visible, uidFirebase]

         const publicationResult = await pool.aquery(sql, params)
         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.insert,
               id: publicationResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`PublicationService.addPublication() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async addFirstPublication(uid_firebase: string, idProduct: number): Promise<any> {
      const newPublication: Publication = new Publication()

      newPublication.id_product = idProduct
      newPublication.nanoid = nanoid()
      newPublication.name = 'My Public Roadmap'
      newPublication.disclaimer = 'Our roadmap is subject to changes without prior notice.'
      newPublication.theme = 'light'
      newPublication.is_name_visible = true
      newPublication.is_vision_visible = true
      newPublication.is_solution_visible = true
      newPublication.is_objective_visible = true
      newPublication.is_disclaimer_visible = true

      const publicationResponse = await this.addPublication(uid_firebase, newPublication)

      return publicationResponse
   }

   public async updatePublication(uidFirebase: string, publication: Publication): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `UPDATE ${this.table_name}
            SET name = $1, 
               disclaimer = $2, 
               theme = $3, 
               is_name_visible = $4, 
               is_vision_visible = $5, 
               is_solution_visible = $6, 
               is_objective_visible = $7, 
               is_disclaimer_visible = $8 
            WHERE id = $9 
               AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $10) 
            RETURNING id`
         let params = [publication.name, publication.disclaimer, publication.theme, publication.is_name_visible, publication.is_vision_visible,
         publication.is_solution_visible, publication.is_objective_visible, publication.is_disclaimer_visible, publication.id, uidFirebase]

         const publicationResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.update,
               id: publicationResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`PublicationService.updatePublication() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   public async deletePublication(uidFirebase: string, idPublication: number): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      try {
         const sql = `DELETE FROM ${this.table_name}
         WHERE id = $1 
            AND id_app_user = (SELECT id FROM app_user WHERE uid_firebase = $2) 
         RETURNING id`
         let params = [idPublication, uidFirebase]

         const publicationResult = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         return {
            success: true,
            data: {
               message: messages.success.delete,
               id: publicationResult.rows[0].id,
            },
         }
      } catch (error) {
         console.log(`PublicationService.updatePublication() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

}

export default PublicationService
