/**
 *        @file product.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Product Class
 * @description Defines the structure for product model
 */

import Helper from '../db_pool/helper'
import { NullableString, NullableNumber } from '../typings/types'
import { Common } from './common'

export class Product extends Common {
   public id: NullableNumber = undefined
   public id_app_user: NullableNumber = undefined
   public name: NullableString = undefined
   public description: NullableString = undefined
   public vision: NullableString = undefined
   public count_initiative: NullableNumber = undefined
   public count_solution: NullableNumber = undefined

   constructor(model?: any) {
      super()
      if (model) {
         Helper.shallowCopy(model, this)
      }
   }

}

export default Product
