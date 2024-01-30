/**
 *        @file schema.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary SchemaMiddleware Class
 * @description Schema middleware that checks and validates request body for each API call
 *   @functions - handle()
 */

import { Response, Request, NextFunction } from 'express'

class SchemaMiddleware {
   public static async handle(req: Request, res: Response, next: NextFunction, Validator: any) {
      try {
         if (Validator) {
            await Validator.validateAsync(req.body)
         }
         return next()
      } catch (error) {
         return res.send({
            success: false,
            data: { message: error.details[0].message },
         })
      }
   }
}

export default SchemaMiddleware
