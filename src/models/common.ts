/**
 *        @file common.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Common Class
 * @description Defines the structure for common fields/properties used across models
 */

import { NullableDate, NullableBoolean } from '../typings/types'

export class Common {
   public created_at: NullableDate = undefined
   public modified_at: NullableDate = undefined
   public deleted: NullableBoolean = undefined
   public deleted_at: NullableDate = undefined
}
