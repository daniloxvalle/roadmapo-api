/**
 *        @file objective.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Objective Class
 * @description Defines the structure for objective model
 */

import Helper from '../db_pool/helper'
import { NullableString, NullableNumber } from '../typings/types'
import { Common } from './common'

export class Objective extends Common {
   public id: NullableNumber = undefined
   public id_app_user: NullableNumber = undefined
   public id_product: NullableNumber = undefined
   public name: NullableString = undefined
   public color: NullableString = undefined

   constructor(model?: any) {
      super()
      if (model) {
         Helper.shallowCopy(model, this)
      }
   }

}

export default Objective
