/**
 *        @file product_validator.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary ProductValidator Class
 * @description Defines validation structure for product API requests
 */

import Joi from 'joi'

class ProductValidator {
   public product() {
      return Joi.object({
         id: Joi.number().allow(null),
         name: Joi.string().required(),
         description: Joi.string().allow(''),
         vision: Joi.string().allow(''),
         count_initiative: Joi.number().allow(null),
         count_solution: Joi.number().allow(null),
      })
   }
}

export default new ProductValidator()
