/**
 *        @file solution_route.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Solution routes
 * @description Handles following routes:
 *              - GET '/'
 *              - POST '/add'
 *              - PUT '/:id'
 */

import { Router } from 'express'
import cors from 'cors'

import { checkIfAuthenticated } from '../../services/firebase_service';
import Schema from '../../middlewares/schema'
import { wrapper } from '../../helpers/exception_wraper'
import { SolutionController } from '../../controllers/solution_controller'
import SolutionValidator from '../../validators/solution_validator'

const router = Router()
var corsOptionsPublic = { origin: '*' };

router.get(
   '/:id_product',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(SolutionController.getSolutions)
)

router.get(
   '/publication/:nanoid',
   cors(corsOptionsPublic),
   wrapper(SolutionController.getSolutionsPublication)
)

router.post(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, SolutionValidator.solution())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(SolutionController.addSolution)
)

router.put(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, SolutionValidator.solution())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(SolutionController.updateSolution)
)

router.delete(
   '/:id',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(SolutionController.deleteSolution)
)

router.post(
   '/gen-description-ai',
   // (req, res, next) => {
   //    checkIfAuthenticated(req, res, next)
   // },
   wrapper(SolutionController.generateDescriptionAI)
)

router.get(
   '/gen-name-ai/:id_initiative',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(SolutionController.generateNameAI)
)

export default router
