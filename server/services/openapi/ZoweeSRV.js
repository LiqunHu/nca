const soap = require('soap')
const moment = require('moment')

const common = require('../../util/CommonUtil')
const logger = require('../../util/Logger').createLogger('IntegrationSRV')
const config = require('../../config')

exports.ZoweeResource = (req, res) => {
  let method = req.query.method
  if (method === 'update_zowee') {
    updateZowee(req, res)
  } else if (method === 'reupdate_zowee') {
    reupdateZowee(req, res)
  } else {
    common.sendError(res, 'common_01')
  }
}

let updateZowee = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let contracttypeid = config.zowee.contracttypeid
    if (doc.contracttype === '2') {
      contracttypeid = config.zowee.remedyid
    }
    let args = {
      joinno: config.zowee.joinno,
      shopno: config.zowee.shopno,
      orderno: doc.orderno,
      customername: doc.customername,
      address: doc.address,
      phone: doc.phone,
      brandid: config.zowee.brandid,
      contracttypeid: contracttypeid,
      finishdate: doc.finishdate,
      filename: [doc.filename],
      filebyte: [doc.filebyte],
      designer: doc.designer,
      designphone: doc.designphone,
      remark: doc.remark,
      opuser: doc.opuser,
      extends: []
    }
    
    let client = await soap.createClientAsync(config.zowee.soapUrl)
    let result = await client.OrderUpload2Async(args)
    if (result.OrderUpload2Result.string[0] === '0') {
      logger.error(result.OrderUpload2Result.string[1])
      return common.sendError(res, '', result.OrderUpload2Result.string[1])
    }

    common.sendData(res)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let reupdateZowee = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)
    let args = {
      orderno: doc.orderno,
      brandid: config.zowee.brandid,
      contracttypeid: config.zowee.contracttypeid,
      finishdate: doc.finishdate,
      filename: [doc.filename],
      filebyte: [doc.filebyte],
      designer: doc.designer,
      designphone: doc.designphone,
      remark: doc.remark,
      opuser: doc.opuser,
      extends: []
    }
    let client = await soap.createClientAsync(config.zowee.soapUrl)
    let result = await client.ReOrderUpload2Async(args)
    if (result.ReOrderUpload2Result.string[0] === '0') {
      logger.error(result.ReOrderUpload2Result.string[1])
      return common.sendError(res, '', result.ReOrderUpload2Result.string[1])
    }
    common.sendData(res)
  } catch (error) {
    return common.sendFault(res, error)
  }
}
