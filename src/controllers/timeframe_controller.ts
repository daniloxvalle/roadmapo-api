/**
 *        @file timeframe_controller.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Timeframe Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - TimeframeService
 *   @functions - getTimeframe()
 *              - addTimeframe()
 *              - updateTimeframe()
 *              - deleteTimeframe() 
 *     @returns Express JSON Response
 */

import { TimeframeService } from '../services/timeframe_service'
import { Response } from 'express'
import { Timeframe } from '../models/timeframe'
import { ResponseWrapper } from '../helpers/response_wrapper'

export class TimeframeController {

   public static async getTimeframe(req: any, res: Response) {
      const timeframeService: TimeframeService = new TimeframeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idProduct: number = parseInt(req.params.id_product)

      return responseWrapped.ok(await timeframeService.getTimeframe(req.authId, idProduct))
   }

   public static async getTimeframePublication(req: any, res: Response) {
      const timeframeService: TimeframeService = new TimeframeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const nanoid: string = req.params.nanoid

      return responseWrapped.ok(await timeframeService.getTimeframePublication(nanoid))
   }

   public static async addTimeframe(req: any, res: Response) {
      const timeframeService: TimeframeService = new TimeframeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const timeframe: Timeframe = new Timeframe(req.body)

      return responseWrapped.created(await timeframeService.addTimeframe(req.authId, timeframe))
   }

   public static async updateTimeframe(req: any, res: Response) {
      const timeframeService: TimeframeService = new TimeframeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const timeframe: Timeframe = new Timeframe(req.body)

      return responseWrapped.ok(await timeframeService.updateTimeframe(req.authId, timeframe))
   }

   public static async deleteTimeframe(req: any, res: Response) {
      const timeframeService: TimeframeService = new TimeframeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const timeframeId = parseInt(req.params.id)

      return responseWrapped.ok(await timeframeService.deleteTimeframe(req.authId, timeframeId))
   }

}
