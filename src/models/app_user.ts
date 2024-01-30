/**
 *        @file app_user.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary App User Class
 * @description Defines the structure for app user model
 */

import { Common } from './common'
import Helper from '../db_pool/helper'
import { NullableNumber, NullableString } from '../typings/types'

export class AppUser extends Common {
   public id: NullableNumber = undefined
   public username: NullableString = undefined
   public uid_firebase: NullableString = undefined

   constructor(model?: any) {
      super()
      if (model) {
         Helper.shallowCopy(model, this)
      }
   }
}

export default AppUser
