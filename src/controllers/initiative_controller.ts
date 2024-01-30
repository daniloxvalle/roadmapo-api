/**
 *        @file initiative_controller.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Initiative Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - InitiativeService
 *   @functions - getInitiatives()
 *              - addInitiative()
 *              - updateInitiative()
 *              - deleteInitiative() 
 *     @returns Express JSON Response
 */
import { difference } from "lodash";

import { InitiativeService } from "../services/initiative_service";
import { InitiativeObjectiveService } from "../services/initiative_objective_service";
import { Response } from 'express'
import { Initiative } from "../models/initiative";
import { InitiativeObjective } from "../models/initiative_objective";
import { ResponseWrapper } from '../helpers/response_wrapper'

export class InitiativeController {

   public static async getInitiatives(req: any, res: Response) {
      const initiativeService: InitiativeService = new InitiativeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idProduct: number = parseInt(req.params.id_product)

      return responseWrapped.ok(await initiativeService.getInitiatives(req.authId, idProduct))
   }

   public static async getInitiativesPublication(req: any, res: Response) {
      const initiativeService: InitiativeService = new InitiativeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const nanoid: string = req.params.nanoid

      return responseWrapped.ok(await initiativeService.getInitiativesPublication(nanoid))
   }

   public static async addInitiative(req: any, res: Response) {
      const initiativeService: InitiativeService = new InitiativeService()
      const initiativeObjectiveService: InitiativeObjectiveService = new InitiativeObjectiveService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)
      const initiative: Initiative = new Initiative(req.body)

      const initiativeResponse = await initiativeService.addInitiative(req.authId, initiative)
      if (initiativeResponse.success && initiative.objectives) {
         initiative.objectives.forEach(function (objective) {
            const newInitiativeObjective = new InitiativeObjective
            newInitiativeObjective.id_product = initiative.id_product
            newInitiativeObjective.id_initiative = initiativeResponse.data.id
            newInitiativeObjective.id_objective = objective.id

            initiativeObjectiveService.addInitiativeObjective(req.authId, newInitiativeObjective).then((response) => {
               if (!response.success) {
                  return responseWrapped.ok(response)
               }
            })
         })
      }
      return responseWrapped.created(initiativeResponse)
   }

   public static async updateInitiative(req: any, res: Response) {
      const initiativeService: InitiativeService = new InitiativeService()
      const initiativeObjectiveService: InitiativeObjectiveService = new InitiativeObjectiveService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)
      const initiative: Initiative = new Initiative(req.body)

      const initiativeObjectiveResponse = await initiativeObjectiveService.getInitiativeObjective(req.authId, initiative)
      const initiativeObjectiveList: InitiativeObjective[] = Object.assign(initiativeObjectiveResponse.data.result)

      const currentObjectiveIds: number[] = []
      initiativeObjectiveList.forEach(function (initiativeObjective) {
         if (initiativeObjective.id_objective)
            currentObjectiveIds.push(initiativeObjective.id_objective)
      })

      const newObjectiveIds: number[] = []
      if (initiative.objectives)
         initiative.objectives.forEach(function (objective) {
            if (objective.id)
               newObjectiveIds.push(objective.id)
         })

      const objectiveIdsToAdd = difference(newObjectiveIds, currentObjectiveIds)
      const objectiveIdsToRemove = difference(currentObjectiveIds, newObjectiveIds)

      objectiveIdsToAdd.forEach(function (idObjective) {
         const newInitiativeObjective = new InitiativeObjective
         newInitiativeObjective.id_product = initiative.id_product
         newInitiativeObjective.id_initiative = initiative.id
         newInitiativeObjective.id_objective = idObjective
         if (initiative.id) {
            initiativeObjectiveService.addInitiativeObjective(req.authId, newInitiativeObjective).then((response) => {
               if (!response.success) {
                  return responseWrapped.ok(response)
               }
            })
         }
      })

      objectiveIdsToRemove.forEach(function (idObjective) {
         if (initiative.id) {
            initiativeObjectiveService.deleteInitiativeObjective(req.authId, initiative.id, idObjective).then((response) => {
               if (!response.success) {
                  return responseWrapped.ok(response)
               }
            })
         }

      })

      return responseWrapped.ok(await initiativeService.updateInitiative(req.authId, initiative))
   }

   public static async deleteInitiative(req: any, res: Response) {
      const initiativeService: InitiativeService = new InitiativeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idInitiative = parseInt(req.params.id)

      return responseWrapped.ok(await initiativeService.deleteInitiative(req.authId, idInitiative))
   }

   public static async generateNameAI(req: any, res: Response) {
      const initiativeService: InitiativeService = new InitiativeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idProduct: number = parseInt(req.params.id_product)

      return responseWrapped.ok(await initiativeService.generateNameAI(req.authId, idProduct))
   }

   public static async generateDescriptionAI(req: any, res: Response) {
      const initiativeService: InitiativeService = new InitiativeService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const initiative: Initiative = new Initiative(req.body)

      return responseWrapped.ok(await initiativeService.generateDescriptionAI(req.authId, initiative))
   }

}
