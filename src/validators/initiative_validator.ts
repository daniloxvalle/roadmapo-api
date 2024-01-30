/**
 *        @file initiative_validator.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary InitiativeValidator Class
 * @description Defines validation structure for Initiative API requests
 */

import Joi from 'joi'
import objective_validator from './objective_validator'

class InitiativeValidator {
   public initiative() {
      return Joi.object({
         id: Joi.number().allow(null),
         id_product: Joi.number().required(),
         id_parent_initiative: Joi.number().allow(null),
         id_timeframe: Joi.number().required(),
         generation: Joi.number().required(),
         name: Joi.string().required(),
         description: Joi.string().allow(''),
         rank: Joi.string().required(),
         objectives: Joi.array().items(objective_validator.objective().allow(null)).allow(null),
      })
   }
}

export default new InitiativeValidator()
