import Model from './code.model'
import BaseController from '../core/base.controller'

export default class CodeController extends BaseController {
  static async addNewRecord(req, res) {
    console.log(req.body)
    super.addNewRecord(req, res, Model)
  }

  static async getById(req, res) {
    super.getById(req, res, Model)
  }

  static async getList(req, res) {
    super.getList(req, res, Model, '')
  }
  static async updateRecord(req, res) {
    super.updateRecord(req, res, Model)
  }
  static async deleteRecord(req, res) {
    super.deleteRecord(req, res, Model)
  }
  static async bulkUpdateRecords(req, res) {
    super.bulkUpdateRecords(req, res, Model)
  }
}
