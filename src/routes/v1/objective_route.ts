/**
 *        @file objective_route.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Objective routes
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
import { ObjectiveController } from '../../controllers/objective_controller'
import ObjectiveValidator from '../../validators/objective_validator'

const router = Router()
var corsOptionsPublic = { origin: '*' };

router.get(
   '/:id_product',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ObjectiveController.getObjectives)
)

router.get(
   '/publication/:nanoid',
   cors(corsOptionsPublic),
   wrapper(ObjectiveController.getObjectivesPublication)
)

router.post(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, ObjectiveValidator.objective())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ObjectiveController.addObjective)
)

router.put(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, ObjectiveValidator.objective())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ObjectiveController.updateObjective)
)

router.delete(
   '/:id',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ObjectiveController.deleteObjective)
)

export default router
