/**
 *        @file common_service.ts
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary CommonService Class
 * @description Defines common functions that can be used across all services
 *   @functions - getRows()
 *              - insertRow()
 *              - insertRows()
 *              - updateRow()
 *              - getAllRows()
 *              - getById()
 *              - getBy()
 */
import { Configuration, OpenAIApi } from "openai";

import Helper from '../db_pool/helper'
import { NullableString } from '../typings/types'
import messages from '../constants'
import * as config from '../../config'

export class CommonService {
   public table_name: string

   public async getRows(sql: string, params?: Array<any>) {
      const pool = Helper.pool()
      let result: any

      try {
         if (params) result = await pool.aquery(sql, params)
         else result = await pool.aquery(sql)

         return { success: true, data: { result: result.rows } }
      } catch (error) {
         console.log(`CommonService.getRows() Query: ${sql}`)
         console.log(`CommonService.getRows() Error: ${error}`)
         return { success: false, data: { message: error.message }, status: error.status }
      }
   }

   public async insertRow(columns: string, param_ids: string, params: Array<any>) {
      const pool = Helper.pool()
      let result: any

      const sql = `INSERT INTO ${this.table_name} (${columns}) VALUES (${param_ids}) returning id`
      try {
         result = await pool.aquery(sql, params)
         if (result.rowCount === 0) throw { message: messages.errors.insert, status: 400 }
         return { success: true, data: { result: messages.success.insert, id: result.rows[0].id } }
      } catch (error) {
         console.log(`CommonService.insertRow() Query: ${sql}`)
         console.log(`CommonService.insertRow() Error: ${error}`)
         return { success: false, data: { message: error.detail || error.message }, status: error.status }
      }
   }

   public async insertRows(columns: string, param_ids: string, params: Array<any>, onconflict = '') {
      const pool = Helper.pool()
      let result: any
      let sql = `INSERT INTO ${this.table_name} (${columns}) VALUES ${param_ids} returning id`
      if (onconflict) {
         sql = `INSERT INTO ${this.table_name} (${columns}) VALUES ${param_ids} ON CONFLICT ${onconflict} returning id`
      }

      try {
         result = await pool.aquery(sql, params)
         if (result.rowCount === 0) throw { message: messages.errors.insert, status: 400 }
         return { success: true, data: { result: messages.success.insert, ids: result.rows } }
      } catch (error) {
         console.log(`CommonService.insertRow() Query: ${sql}`)
         console.log(`CommonService.insertRows() Error: ${error}`)
         return { success: false, data: { message: error.detail || error.message }, status: error.status }
      }
   }

   public async updateRow(columns: string, condition: string) {
      const pool = Helper.pool()
      let result: any

      const sql = `UPDATE ${this.table_name} SET ${columns} WHERE ${condition}`
      try {
         result = await pool.aquery(sql)
         if (result.rowCount === 0) throw { message: messages.errors.notFound, status: 404 }
         return { success: true, data: { result: messages.success.update } }
      } catch (error) {
         console.log(`CommonService.updateRow() Query: ${sql}`)
         console.log(`CommonService.updateRow() Error: ${error}`)
         return { success: false, data: { message: error.detail || error.message }, status: error.status }
      }
   }

   public async getAllRows(table_name: NullableString = null): Promise<any> {
      return this.getRows('SELECT * FROM  ' + (table_name ? table_name : this.table_name))
   }

   public getFilteredRows(condition: string, params: Array<any>): any {
      return this.getRows(`SELECT * FROM ${this.table_name} WHERE ${condition}`, params)
   }

   public getById(id: number): Promise<any> {
      return this.getBy('id', id)
   }

   public getBy(_columnName: string, _value: any): Promise<any> {
      return this.getRows(`SELECT * FROM ${this.table_name} WHERE ${_columnName} = $1 `, [_value])
   }

   public openAIConfiguration() {
      const configuration = new Configuration({
         apiKey: config.openaiConfig.apiKey,
      });
      delete configuration.baseOptions.headers['User-Agent'];
      return new OpenAIApi(configuration);
   }
}

export default CommonService
