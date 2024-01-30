/**
 *        @file initiative_objective.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary InitiativeObjective Class
 * @description Defines the structure for InitiativeObjective model
 */

import Helper from '../db_pool/helper'
import { NullableNumber } from '../typings/types'
import { Common } from './common'

export class InitiativeObjective extends Common {
   public id: NullableNumber = undefined
   public id_app_user: NullableNumber = undefined
   public id_product: NullableNumber = undefined
   public id_initiative: NullableNumber = undefined
   public id_objective: NullableNumber = undefined

   constructor(model?: any) {
      super()
      if (model) {
         Helper.shallowCopy(model, this)
      }
   }

}

export default InitiativeObjective
