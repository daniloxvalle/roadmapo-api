/**
 *        @file timeframe_validator.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary TimeframeValidator Class
 * @description Defines validation structure for Timeframe API requests
 */

import Joi from 'joi'

class TimeframeValidator {
   public timeframe() {
      return Joi.object({
         id: Joi.number().allow(null),
         id_product: Joi.number().required(),
         name: Joi.string().required(),
         summary: Joi.string().allow(''),
         is_archived: Joi.boolean().required(),
      })
   }
}

export default new TimeframeValidator()
