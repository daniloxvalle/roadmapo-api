/**
 *        @file app_user_route.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary App User routes
 * @description Handles following routes:
 *              - POST '/add'
 */
import express from 'express'
import { checkIfAuthenticated } from '../../services/firebase_service';

import Schema from '../../middlewares/schema'
import AppUserValidator from '../../validators/app_user_validator'
import { AppUserController } from '../../controllers/app_user_controller'
import { wrapper } from '../../helpers/exception_wraper'

const router = express.Router()

router.post(
   '/add',
   (req, res, next) => {
      Schema.handle(req, res, next, AppUserValidator.user())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(AppUserController.addAppUser)
)

export default router
