/**
 *        @file initiative.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Initiative Class
 * @description Defines the structure for initiative model
 */

import Helper from '../db_pool/helper'
import { NullableString, NullableNumber } from '../typings/types'
import { Common } from './common'
import Objective from './objective'

export class Initiative extends Common {
   public id: NullableNumber = undefined
   public id_app_user: NullableNumber = undefined
   public id_product: NullableNumber = undefined
   public id_parent_initiative: NullableNumber = undefined
   public id_timeframe: NullableNumber = undefined
   public generation: NullableNumber = undefined
   public name: NullableString = undefined
   public description: NullableString = undefined
   public rank: NullableString = undefined
   public objectives: Objective[] = []

   constructor(model?: any) {
      super()
      if (model) {
         Helper.shallowCopy(model, this)
      }
   }

}

export default Initiative
