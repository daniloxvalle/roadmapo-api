/**
 *        @file publication.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Publication Class
 * @description Defines the structure for Publication model
 */

import Helper from '../db_pool/helper'
import { NullableString, NullableNumber, NullableBoolean } from '../typings/types'
import { Common } from './common'

export class Publication extends Common {
   public id: NullableNumber = undefined
   public id_app_user: NullableNumber = undefined
   public id_product: NullableNumber = undefined
   public nanoid: NullableString = undefined
   public name: NullableString = undefined
   public disclaimer: NullableString = undefined
   public theme: NullableString = undefined
   public is_name_visible: NullableBoolean = undefined
   public is_vision_visible: NullableBoolean = undefined
   public is_solution_visible: NullableBoolean = undefined
   public is_objective_visible: NullableBoolean = undefined
   public is_disclaimer_visible: NullableBoolean = undefined

   constructor(model?: any) {
      super()
      if (model) {
         Helper.shallowCopy(model, this)
      }
   }

}

export default Publication
