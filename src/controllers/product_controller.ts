/**
 *        @file product_controller.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Product Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - ProductService
 *   @functions - getProducts()
 *              - getProduct()
 *              - getProductPublication()
 *              - addProduct()
 *              - updateProduct()
 *              - deleteProduct() 
 *     @returns Express JSON Response
 */

import { ProductService } from "../services/product_service";
import { Response } from 'express'
import { Product } from "../models/product";
import { ResponseWrapper } from '../helpers/response_wrapper'

export class ProductController {

   public static async getProducts(req: any, res: Response) {
      const productService: ProductService = new ProductService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      return responseWrapped.ok(await productService.getProducts(req.authId))
   }

   public static async getProduct(req: any, res: Response) {
      const productService: ProductService = new ProductService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idProduct: number = parseInt(req.params.id)

      return responseWrapped.ok(await productService.getProduct(req.authId, idProduct))
   }

   public static async getProductPublication(req: any, res: Response) {
      const productService: ProductService = new ProductService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const nanoid: string = req.params.nanoid

      return responseWrapped.ok(await productService.getProductPublication(nanoid))
   }

   public static async addProduct(req: any, res: Response) {
      const productService: ProductService = new ProductService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const product: Product = new Product(req.body)

      return responseWrapped.created(await productService.addProduct(req.authId, product))
   }

   public static async updateProduct(req: any, res: Response) {
      const productService: ProductService = new ProductService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const product: Product = new Product(req.body)

      return responseWrapped.ok(await productService.updateProduct(req.authId, product))
   }

   public static async deleteProduct(req: any, res: Response) {
      const productService: ProductService = new ProductService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const idProduct = parseInt(req.params.id)

      return responseWrapped.ok(await productService.deleteProduct(req.authId, idProduct))
   }

   public static async generateDescriptionAI(req: any, res: Response) {
      const solutionService: ProductService = new ProductService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const product: Product = new Product(req.body)

      return responseWrapped.ok(await solutionService.generateDescriptionAI(req.authId, product))
   }

   public static async generateVisionAI(req: any, res: Response) {
      const solutionService: ProductService = new ProductService()
      const responseWrapped: ResponseWrapper = new ResponseWrapper(res)

      const product: Product = new Product(req.body)

      return responseWrapped.ok(await solutionService.generateVisionAI(req.authId, product))
   }
}
