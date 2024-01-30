/**
 *        @file app_user_validator.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary AppUserValidator Class
 * @description Defines validation structure for user API requests
 */

import Joi from 'joi'

class AppUserValidator {
   public user() {
      return Joi.object({
         id: Joi.number().allow(null),
         username: Joi.string().required(),
         uid_firebase: Joi.string().required(),
      })
   }
}

export default new AppUserValidator()
