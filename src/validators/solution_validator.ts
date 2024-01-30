/**
 *        @file solution_validator.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary SolutionValidator Class
 * @description Defines validation structure for Solution API requests
 */

import Joi from 'joi'

class SolutionValidator {
   public solution() {
      return Joi.object({
         id: Joi.number().allow(null),
         id_product: Joi.number().required(),
         id_initiative: Joi.number().required(),
         id_solution_status: Joi.number().required(),
         id_parent_solution: Joi.number().allow(null),
         name: Joi.string().required(),
         description: Joi.string().allow(''),
         is_parent: Joi.boolean().required(),
         rank: Joi.string().required(),
      })
   }
}

export default new SolutionValidator()
