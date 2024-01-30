/**
 *        @file publication_controller.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Publication Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - PublicationService
 *   @functions - getPublication()
 *              - addPublication()
 *              - updatePublication()
 *              - deletePublication() 
 *     @returns Express JSON Response
 */

import { PublicationService } from '../services/publication_service'
import { Response } from 'express'
import { Publication } from '../models/publication'
import { ResponseWrapper } from '../helpers/response_wrapper'

export class PublicationController {

   public static async getPublication(req: any, res: Response) {
      const publicationService: PublicationService = new PublicationService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idProduct: number = parseInt(req.params.id_product)

      return responseWrapped.ok(await publicationService.getPublication(req.authId, idProduct))
   }

   public static async getPublicationPublication(req: any, res: Response) {
      const publicationService: PublicationService = new PublicationService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const nanoid: string = req.params.nanoid

      return responseWrapped.ok(await publicationService.getPublicationPublication(nanoid))
   }

   public static async addPublication(req: any, res: Response) {
      const publicationService: PublicationService = new PublicationService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const publication: Publication = new Publication(req.body)

      return responseWrapped.created(await publicationService.addPublication(req.authId, publication))
   }

   public static async updatePublication(req: any, res: Response) {
      const publicationService: PublicationService = new PublicationService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const publication: Publication = new Publication(req.body)

      return responseWrapped.ok(await publicationService.updatePublication(req.authId, publication))
   }

   public static async deletePublication(req: any, res: Response) {
      const publicationService: PublicationService = new PublicationService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const publicationId = parseInt(req.params.id)

      return responseWrapped.ok(await publicationService.deletePublication(req.authId, publicationId))
   }

}
