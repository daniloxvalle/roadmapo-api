/**
 *        @file solution.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Solution Class
 * @description Defines the structure for solution model
 */

import Helper from '../db_pool/helper'
import { NullableString, NullableNumber, NullableBoolean } from '../typings/types'
import { Common } from './common'

export class Solution extends Common {
   public id: NullableNumber = undefined
   public id_app_user: NullableNumber = undefined
   public id_product: NullableNumber = undefined
   public id_initiative: NullableNumber = undefined
   public id_solution_status: NullableNumber = undefined
   public id_parent_solution: NullableNumber = undefined
   public name: NullableString = undefined
   public description: NullableString = undefined
   public is_parent: NullableBoolean = undefined
   public rank: NullableString = undefined

   constructor(model?: any) {
      super()
      if (model) {
         Helper.shallowCopy(model, this)
      }
   }

}

export default Solution
