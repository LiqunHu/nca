const moment = require('moment')
const uuid = require('uuid')
const rp = require('request-promise')
const soap = require('soap')

const common = require('../../util/CommonUtil')
const logger = require('../../util/Logger').createLogger('IntegrationSRV')
const model = require('../../model')

const sequelize = model.sequelize
const tb_user = model.integration_user
const tb_orderkujiale = model.integration_orderkujiale

exports.IntegrationResource = (req, res) => {
  let method = req.query.method
  if (method === 'access') {
    access(req, res)
  } else if (method === 'search_order') {
    searchOrder(req, res)
  } else if (method === 'add_order') {
    addOrder(req, res)
  } else if (method === 'update_fpid') {
    updateFpid(req, res)
  } else if (method === 'update_desid') {
    updateDesid(req, res)
  } else {
    common.sendError(res, 'common_01')
  }
}

let access = async (req, res) => {
  try {
    let doc = common.docTrim(req.body),
      returnData = {}
    if (doc.user_id) {
      let user = await tb_user.findOne({
        where: {
          user_id: doc.user_id
        }
      })

      if (user) {
        user.phone = doc.phone
        user.name = doc.name
        user.appuid = doc.appuid
        await user.save()
      } else {
        user = await tb_user.create({
          user_id: doc.user_id,
          name: doc.name,
          phone: doc.phone,
          appuid: doc.appuid
        })
      }
      if (doc.design_id) {
        let order = await tb_orderkujiale.findOne({
          where: {
            design_id: doc.design_id
          }
        })
        if (!order) {
          await tb_orderkujiale.create({
            user_id: user.user_id,
            houses_id: doc.houses_id,
            houses_name: doc.houses_name,
            design_id: doc.design_id,
            design_name: doc.design_name,
            design_address: doc.design_address,
            appuid: user.appuid,
            type: '1'
          })
        }
      }

      returnData = JSON.parse(JSON.stringify(user))
    } else {
      return common.sendError(res, 'integration_01')
    }
    common.sendData(res, returnData)
  } catch (error) {
    common.sendFault(res, error)
  }
}

let searchOrder = async (req, res) => {
  try {
    let doc = common.docTrim(req.body),
      returnData = {},
      replacements = []
    let queryStr = `select * from tbl_integration_orderkujiale a, tbl_integration_user b where a.appuid = b.appuid and a.type = '1'`
    if (doc.search_text) {
      queryStr +=
        ' and (a.houses_id like ? or a.design_id like ? or b.phone like ? or b.name like ?)'
      replacements.push('%' + doc.search_text + '%')
      replacements.push('%' + doc.search_text + '%')
      replacements.push('%' + doc.search_text + '%')
      replacements.push('%' + doc.search_text + '%')
    }
    queryStr += ' order by a.created_at desc LIMIT 8'
    let result = await common.simpleSelect(sequelize, queryStr, replacements)
    returnData.rows = []
    for (let r of result) {
      let result = JSON.parse(JSON.stringify(r))
      result.create_date = r.order_created_at
        ? moment(r.order_created_at).format('YYYY-MM-DD')
        : null
      returnData.rows.push(result)
    }
    common.sendData(res, returnData)
  } catch (error) {
    common.sendFault(res, error)
  }
}

let addOrder = async (req, res) => {
  try {
    let doc = common.docTrim(req.body),
      returnData = {}
    if (doc.user_id) {
      let user = await tb_user.findOne({
        where: {
          user_id: doc.user_id
        }
      })

      if (!user) {
        user = await tb_user.create({
          user_id: doc.user_id,
          name: doc.name,
          phone: doc.phone,
          appuid: doc.appuid
        })
      }
      let order = await tb_orderkujiale.create({
        user_id: user.user_id,
        houses_id: doc.houses_id,
        houses_name: doc.houses_name,
        design_id: uuid.v1().replace(/-/g, ''),
        design_name: doc.design_name,
        appuid: user.appuid,
        type: '1'
      })

      let options = {
        method: 'POST',
        uri:
          'https://n2cs.dingdingxiujia.com/api/xiaoshouyi/design/PlanSync/kjlPlanSync',
        formData: {
          name: order.design_name,
          siteId: order.houses_id,
          designId: order.design_id,
          houseImg: '',
          area: '',
          type: '',
          cad: '',
          panoramaImg: '',
          materielCode: '',
          ownerid: user.appuid
        }
      }

      let body = await rp(options)

      returnData = JSON.parse(JSON.stringify(order))
    } else {
      return common.sendError(res, 'integration_01')
    }
    common.sendData(res, returnData)
  } catch (error) {
    common.sendFault(res, error)
  }
}

let updateFpid = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)
    let design = await tb_orderkujiale.findOne({
      where: {
        design_id: doc.design_id
      }
    })
    design.fpid = doc.fpid
    await design.save()
    common.sendData(res, design)
  } catch (error) {
    throw error
  }
}

let updateDesid = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)
    let design = await tb_orderkujiale.findOne({
      where: {
        design_id: doc.design_id
      }
    })
    design.desid = doc.desid
    await design.save()
    common.sendData(res, design)
  } catch (error) {
    throw error
  }
}
