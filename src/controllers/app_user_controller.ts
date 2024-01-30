/**
 *        @file user_controller.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary App User Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - AppUserService
 *   @functions - addAppUser()
 *     @returns Express JSON Response
 */

import { Response } from 'express'
import { AppUserService } from '../services/app_user_service'
import { AppUser } from '../models/app_user'
import { ResponseWrapper } from '../helpers/response_wrapper'

export class AppUserController {

   public static async addAppUser(req: Request, res: Response) {
      const appUser = new AppUser(req.body)

      const appUserService: AppUserService = new AppUserService()
      const response: ResponseWrapper = new ResponseWrapper(res)

      return response.created(await appUserService.addAppUser(appUser))
   }

}
