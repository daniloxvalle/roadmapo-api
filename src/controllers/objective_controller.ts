/**
 *        @file objective_controller.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Objective Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - ObjectiveService
 *   @functions - getObjectives()
 *              - addObjective()
 *              - updateObjective()
 *              - deleteObjective() 
 *     @returns Express JSON Response
 */

import { ObjectiveService } from "../services/objective_service";
import { Response } from 'express'
import { Objective } from "../models/objective";
import { ResponseWrapper } from '../helpers/response_wrapper'

export class ObjectiveController {

   public static async getObjectives(req: any, res: Response) {
      const objectiveService: ObjectiveService = new ObjectiveService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idProduct: number = parseInt(req.params.id_product)

      return responseWrapped.ok(await objectiveService.getObjectives(req.authId, idProduct))
   }

   public static async getObjectivesPublication(req: any, res: Response) {
      const objectiveService: ObjectiveService = new ObjectiveService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const nanoid: string = req.params.nanoid

      return responseWrapped.ok(await objectiveService.getObjectivesPublication(nanoid))
   }

   public static async addObjective(req: any, res: Response) {
      const objectiveService: ObjectiveService = new ObjectiveService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const objective: Objective = new Objective(req.body)

      return responseWrapped.created(await objectiveService.addObjective(req.authId, objective))
   }

   public static async updateObjective(req: any, res: Response) {
      const objectiveService: ObjectiveService = new ObjectiveService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const objective: Objective = new Objective(req.body)

      return responseWrapped.ok(await objectiveService.updateObjective(req.authId, objective))
   }

   public static async deleteObjective(req: any, res: Response) {
      const objectiveService: ObjectiveService = new ObjectiveService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const objectiveId = parseInt(req.params.id)

      return responseWrapped.ok(await objectiveService.deleteObjective(req.authId, objectiveId))
   }

}
