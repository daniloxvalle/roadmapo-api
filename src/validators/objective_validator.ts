/**
 *        @file objective_validator.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary ObjectiveValidator Class
 * @description Defines validation structure for Objective API requests
 */

import Joi from 'joi'

class ObjectiveValidator {
   public objective() {
      return Joi.object({
         id: Joi.number().allow(null),
         id_app_user: Joi.number().allow(null),
         id_product: Joi.number().required(),
         name: Joi.string().required(),
         description: Joi.string().allow(''),
         color: Joi.string().required(),
      })
   }
}

export default new ObjectiveValidator()
