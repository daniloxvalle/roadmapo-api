/**
 *        @file publication_route.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Publication routes
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
import { PublicationController } from '../../controllers/publication_controller'
import PublicationValidator from '../../validators/publication_validator'

const router = Router()
var corsOptionsPublic = { origin: '*' };

router.get(
   '/:id_product',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(PublicationController.getPublication)
)

router.get(
   '/publication/:nanoid',
   cors(corsOptionsPublic),
   wrapper(PublicationController.getPublicationPublication)
)

router.post(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, PublicationValidator.publication())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(PublicationController.addPublication)
)

router.put(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, PublicationValidator.publication())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(PublicationController.updatePublication)
)

router.delete(
   '/:id',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(PublicationController.deletePublication)
)

export default router
