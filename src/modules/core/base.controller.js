import HTTPStatus from 'http-status'
import constants from '../../config/constants'
import async from 'async'
import _ from 'lodash'
import * as logger from '../../helpers/logger'

export default class BaseController {
  static async addNewRecord(req, res, model) {
    try {
      console.log('calling create controller')
      const newRecord = await model.create(req.body)
      return res.status(HTTPStatus.CREATED).json(newRecord)
    } catch (e) {
      logger.error(e)
      return res.status(HTTPStatus.BAD_REQUEST).json(e)
    }
  }

  static async getById(req, res, model) {
    try {
      const record = await model.findById(req.params.id)

      return res.status(HTTPStatus.OK).json({
        ...record.toJSON(),
      })
    } catch (e) {
      logger.error(e)
      return res.status(HTTPStatus.BAD_REQUEST).json(e)
    }
  }

  static async getList(req, res, model, selectFields = '') {
    const limit = parseInt(req.query.limit, 0)
    const skip = parseInt(req.query.skip, 0)

    if (limit === 0) {
      limit = constants.DEFAULT_PAGE_SIZE
    }

    model
      .find({}, selectFields, (err, records) => {
        if (err) {
          res.status(HTTPStatus.BAD_REQUEST).json(err)
        }
        res.status(HTTPStatus.OK).json(records)
      })
      .limit(limit)
      .skip(skip)
  }

  static async updateRecord(req, res, model) {
    try {
      const modifiedRecord = await model.findById(req.params.id)

      Object.keys(req.body).forEach(key => {
        modifiedRecord[key] = req.body[key]
      })

      return res.status(HTTPStatus.OK).json(await modifiedRecord.save())
    } catch (e) {
      logger.error(e)
      return res.status(HTTPStatus.BAD_REQUEST).json(e)
    }
  }

  static async softDeleteRecord(req, res, model) {
    try {
      const deletedRecord = await model.findById(req.params.id)

      deletedRecord.isActive = false
      deletedRecord.modifiedBy = req.user._id

      return res.status(HTTPStatus.OK).json(await modifiedRecord.save())
    } catch (e) {
      logger.error(e)
      return res.status(HTTPStatus.BAD_REQUEST).json(e)
    }
  }

  static async hardDeleteRecord(req, res, model) {
    try {
      const deletedRecord = await model.findById(req.params.id)

      await deletedRecord.remove()
      return res.sendStatus(HTTPStatus.NO_CONTENT)
    } catch (e) {
      logger.error(e)
      return res.status(HTTPStatus.BAD_REQUEST).json(e)
    }
  }

  static async bulkUpdateRecords(req, res, model) {
    let data = req.body
    let notInsertedRecords = []
    let insertedRecords = []

    async.eachSeries(
      data,
      (element, elementCallback) => {
        if (_.isUndefined(element._id)) {
          element._id = new mongoose.mongo.ObjectID()
        }
        model.findOneAndUpdate(
          { _id: element._id },
          element,
          { upsert: true, new: true },
          (err, record) => {
            if (err) {
              logger.error(e)
              notInsertedRecords.push({ record: element, err: err })
            } else {
              insertedRecords.push(record)
            }
            elementCallback()
          }
        )
      },
      err => {
        if (err) {
          logger.error(e)
        }
        res.json({
          insertedRecords: insertedRecords,
          notInsertedRecords: notInsertedRecords,
        })
      }
    )
  }
}
