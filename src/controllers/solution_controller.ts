/**
 *        @file solution_controller.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Solution Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - SolutionService
 *   @functions - getSolutions()
 *              - addSolution()
 *              - updateSolution()
 *              - deleteSolution() 
 *     @returns Express JSON Response
 */

import { SolutionService } from "../services/solution_service";
import { Response } from 'express'
import { Solution } from "../models/solution";
import { ResponseWrapper } from '../helpers/response_wrapper'

export class SolutionController {

   public static async getSolutions(req: any, res: Response) {
      const solutionService: SolutionService = new SolutionService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idProduct: number = parseInt(req.params.id_product)

      return responseWrapped.ok(await solutionService.getSolutions(req.authId, idProduct))
   }

   public static async getSolutionsPublication(req: any, res: Response) {
      const solutionService: SolutionService = new SolutionService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const nanoid: string = req.params.nanoid

      return responseWrapped.ok(await solutionService.getSolutionsPublication(nanoid))
   }

   public static async addSolution(req: any, res: Response) {
      const solutionService: SolutionService = new SolutionService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const solution: Solution = new Solution(req.body)

      return responseWrapped.created(await solutionService.addSolution(req.authId, solution))
   }

   public static async updateSolution(req: any, res: Response) {
      const solutionService: SolutionService = new SolutionService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const solution: Solution = new Solution(req.body)

      return responseWrapped.ok(await solutionService.updateSolution(req.authId, solution))
   }

   public static async deleteSolution(req: any, res: Response) {
      const solutionService: SolutionService = new SolutionService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const solutionId = parseInt(req.params.id)

      return responseWrapped.ok(await solutionService.deleteSolution(req.authId, solutionId))
   }

   public static async generateDescriptionAI(req: any, res: Response) {
      const solutionService: SolutionService = new SolutionService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const solutionName = (req.body.name).toString()

      return responseWrapped.ok(await solutionService.generateDescriptionAI(req.authId, solutionName))
   }

   public static async generateNameAI(req: any, res: Response) {
      const solutionService: SolutionService = new SolutionService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const initiativeId = parseInt(req.params.id_initiative)

      return responseWrapped.ok(await solutionService.generateNameAI(req.authId, initiativeId))
   }
}
