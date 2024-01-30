/**
 *        @file timeframe_route.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Timeframe routes
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
import { TimeframeController } from '../../controllers/timeframe_controller'
import TimeframeValidator from '../../validators/timeframe_validator'

const router = Router()
var corsOptionsPublic = { origin: '*' };

router.get(
   '/:id_product',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(TimeframeController.getTimeframe)
)

router.get(
   '/publication/:nanoid',
   cors(corsOptionsPublic),
   wrapper(TimeframeController.getTimeframePublication)
)

router.post(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, TimeframeValidator.timeframe())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(TimeframeController.addTimeframe)
)

router.put(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, TimeframeValidator.timeframe())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(TimeframeController.updateTimeframe)
)

router.delete(
   '/:id',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(TimeframeController.deleteTimeframe)
)

export default router
