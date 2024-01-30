/**
 *        @file publication_validator.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary PublicationValidator Class
 * @description Defines validation structure for Publication API requests
 */

import Joi from 'joi'

class PublicationValidator {
   public publication() {
      return Joi.object({
         id: Joi.number().allow(null),
         id_product: Joi.number().required(),
         nanoid: Joi.string().required(),
         name: Joi.string().required().allow(''),
         disclaimer: Joi.string().required().allow(''),
         theme: Joi.string().allow(''),
         is_name_visible: Joi.boolean().required(),
         is_vision_visible: Joi.boolean().required(),
         is_solution_visible: Joi.boolean().required(),
         is_objective_visible: Joi.boolean().required(),
         is_disclaimer_visible: Joi.boolean().required(),
      })
   }
}

export default new PublicationValidator()
