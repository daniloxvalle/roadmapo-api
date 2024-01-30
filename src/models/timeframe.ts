/**
 *        @file timeframe.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Timeframe Class
 * @description Defines the structure for Timeframe model
 */

import Helper from '../db_pool/helper'
import { NullableString, NullableNumber, NullableBoolean } from '../typings/types'
import { Common } from './common'

export class Timeframe extends Common {
   public id: NullableNumber = undefined
   public id_app_user: NullableNumber = undefined
   public id_product: NullableNumber = undefined
   public name: NullableString = undefined
   public summary: NullableString = undefined
   public is_archived: NullableBoolean = undefined

   constructor(model?: any) {
      super()
      if (model) {
         Helper.shallowCopy(model, this)
      }
   }

}

export default Timeframe
