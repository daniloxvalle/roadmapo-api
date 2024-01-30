/**
 *        @file product_route.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Product routes
 * @description Handles following routes:
 *              - GET '/'
 *              - GET '/:id'
 *              - POST '/add'
 *              - PUT '/:id'
 */

import { Router } from 'express'
import cors from 'cors'

import { checkIfAuthenticated } from '../../services/firebase_service';
import Schema from '../../middlewares/schema'
import { wrapper } from '../../helpers/exception_wraper'
import { ProductController } from '../../controllers/product_controller'
import ProductValidator from '../../validators/product_validator'

const router = Router()
var corsOptionsPublic = { origin: '*' };

router.get(
   '/',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ProductController.getProducts)
)

router.get(
   '/:id',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ProductController.getProduct)
)

router.get(
   '/publication/:nanoid',
   cors(corsOptionsPublic),
   wrapper(ProductController.getProductPublication)
)

router.post(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, ProductValidator.product())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ProductController.addProduct)
)

router.put(
   '/',
   (req, res, next) => {
      Schema.handle(req, res, next, ProductValidator.product())
   },
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ProductController.updateProduct)
)

router.delete(
   '/:id',
   (req, res, next) => {
      checkIfAuthenticated(req, res, next)
   },
   wrapper(ProductController.deleteProduct)
)

router.post(
   '/gen-description-ai',
   // (req, res, next) => {
   //    checkIfAuthenticated(req, res, next)
   // },
   wrapper(ProductController.generateDescriptionAI)
)

router.post(
   '/gen-vision-ai',
   // (req, res, next) => {
   //    checkIfAuthenticated(req, res, next)
   // },
   wrapper(ProductController.generateVisionAI)
)

export default router
