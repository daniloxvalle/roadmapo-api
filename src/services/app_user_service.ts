/**
 *        @file user_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary UserService Class
 * @description Define Functions that perform CRUD operations on users
 *   @functions - addAppUser()
 */

import Helper from '../db_pool/helper'
import { AppUser } from '../models/app_user'
import messages from '../constants'
import ProductService from './product_service'
import TimeframeService from './timeframe_service'
import InitiativeService from './initiative_service'
import SolutionService from './solution_service'
import PublicationService from './publication_service'

export class AppUserService {

   public async addAppUser(appUser: AppUser): Promise<any> {
      const pool = Helper.pool()
      await Helper.beginTransaction(pool)

      if (!/\S+@\S+\.\S+/.test(appUser.username || '')) {
         return { success: false, data: { message: messages.errors.user.email } }
      }

      try {
         // const sql = `MERGE INTO app_user app
         //    USING (SELECT $1 AS username) AS usr
         //    ON (app.username = usr.username)
         //    WHEN NOT MATCHED THEN
         //       INSERT (username, uid_firebase)
         //       VALUES($1, $2)`
         const sql = `INSERT INTO app_user (username, uid_firebase)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING id`
         let params = [appUser.username, appUser.uid_firebase]

         const idAppUser = await pool.aquery(sql, params)

         await Helper.commitTransaction(pool)

         if (appUser.uid_firebase && idAppUser) {
            const productResponse = await this.addNewUserData(appUser.uid_firebase)

            return {
               success: productResponse.success,
               data: {
                  message: messages.success.initialDataCreated,
                  id: productResponse.data.id,
               },
            }
         }
         else {
            return { success: false, data: { message: "Error creating user" } }
         }

      } catch (error) {
         console.log(`UserService.addUser() Error: ${error} `)
         return { success: false, data: { message: error.detail || error } }
      }
   }

   private async addNewUserData(uid_firebase: string): Promise<any> {
      console.log('addNewUserData: ', uid_firebase)
      const productService: ProductService = new ProductService()
      const productResponse = await productService.addFirstProduct(uid_firebase)

      return productResponse
   }

}

export default AppUserService
