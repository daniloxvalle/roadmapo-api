/**
 *        @file initiative_route.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Initiative routes
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
import { InitiativeController } from '../../controllers/initiative_controller'
import InitiativeValidator from '../../validators/initiative_validator'

const router = Router()
var corsOptionsPublic = { origin: '*' };

router.get(
   '/:id_product',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(InitiativeController.getInitiatives)
)

router.get(
   '/publication/:nanoid',
   cors(corsOptionsPublic),
   wrapper(InitiativeController.getInitiativesPublication)
)

router.post(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, InitiativeValidator.initiative())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(InitiativeController.addInitiative)
)

router.put(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, InitiativeValidator.initiative())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(InitiativeController.updateInitiative)
)

router.delete(
   '/:id',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(InitiativeController.deleteInitiative)
)

router.get(
   '/gen-name-ai/:id_product',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(InitiativeController.generateNameAI)
)

router.post(
   '/gen-description-ai/',
   (req, res, next) => {
      Schema.handle(req, res, next, InitiativeValidator.initiative())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(InitiativeController.generateDescriptionAI)
)

export default router
