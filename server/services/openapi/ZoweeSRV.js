const soap = require('soap')
const moment = require('moment')

const common = require('../../util/CommonUtil')
const logger = require('../../util/Logger').createLogger('IntegrationSRV')
const config = require('../../config')

exports.ZoweeResource = (req, res) => {
  let method = req.query.method
  if (method === 'getBrand_zowee') {
    getbrandZowee(req, res)
  } else if (method === 'getContractType_zowee') {
    getContractType(req, res)
  } else if (method === 'getContractPrice_zowee') {
    getContractPrice(req, res)
  } else if (method === 'getContractInfo_zowee') {
    getContractInfo(req, res)
  } else if (method === 'joinPriceConfirm_zowee') {
    joinPriceConfirm(req, res)
  } else if (method === 'update_zowee') {
    updateZowee(req, res)
  } else if (method === 'reupdate_zowee') {
    reupdateZowee(req, res)
  } else {
    common.sendError(res, 'common_01')
  }
}

let getbrandZowee = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let client = await soap.createClientAsync(config.zowee.soapUrl)
    let result = await client.GetBrandAsync({ JOINNO: doc.JOINNO })
    if (result.GetBrandResult.string[0] === '0') {
      logger.error(result.GetBrandResult.string[1])
      return common.sendError(res, '', result.GetBrandResult.string[1])
    }

    common.sendData(res, { data: result.GetBrandResult.string[1] })
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let getContractType = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let client = await soap.createClientAsync(config.zowee.soapUrl)
    let result = await client.GetContractTypeAsync({ BRANDID: doc.BRANDID })
    if (result.GetContractTypeResult.string[0] === '0') {
      logger.error(result.GetContractTypeResult.string[1])
      return common.sendError(res, '', result.GetContractTypeResult.string[1])
    }

    common.sendData(res, { data: result.GetContractTypeResult.string[1] })
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let getContractPrice = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let client = await soap.createClientAsync(config.zowee.soapUrl)
    let result = await client.GetContractPriceAsync({ orderno: doc.orderno })
    if (result.GetContractPriceResult.string[0] === '0') {
      logger.error(result.GetContractPriceResult.string[1])
      return common.sendError(res, '', result.GetContractPriceResult.string[1])
    }

    common.sendData(res, { data: result.GetContractPriceResult.string[1] })
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let getContractInfo = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let client = await soap.createClientAsync(config.zowee.soapUrl)
    let result = await client.GetContractInfoAsync({ orderno: doc.orderno })
    if (result.GetContractInfoResult.string[0] === '0') {
      logger.error(result.GetContractInfoResult.string[1])
      return common.sendError(res, '', result.GetContractInfoResult.string[1])
    }

    common.sendData(res, { data: result.GetContractInfoResult.string[1] })
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let joinPriceConfirm = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let client = await soap.createClientAsync(config.zowee.soapUrl)
    let result = await client.JoinPriceConfirmAsync({
      orderno: doc.orderno,
      opstate: doc.opstate,
      remark: doc.remark,
      opuser: doc.opuser
    })
    if (result.JoinPriceConfirmResult.string[0] === '0') {
      logger.error(result.JoinPriceConfirmResult.string[1])
      return common.sendError(res, '', result.JoinPriceConfirmResult.string[1])
    }

    common.sendData(res)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let updateZowee = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let args = {
      joinno: doc.joinno,
      shopno: doc.shopno,
      orderno: doc.orderno,
      customername: doc.customername,
      address: doc.address,
      phone: doc.phone,
      brandid: doc.brandid,
      contracttypeid: doc.contracttypeid,
      finishdate: doc.finishdate,
      filename: {
        string: [doc.filename]
      },
      filebyte: {
        base64Binary: [doc.filebyte]
      },
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

    common.sendData(res, { orderno: result.ReOrderUpload2Result.string[1] })
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let reupdateZowee = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)
    let args = {
      orderno: doc.orderno,
      brandid: doc.brandid,
      contracttypeid: doc.contracttypeid,
      finishdate: doc.finishdate,
      filename: {
        string: [doc.filename]
      },
      filebyte: {
        base64Binary: [doc.filebyte]
      },
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
    common.sendData(res, { orderno: result.ReOrderUpload2Result.string[1] })
  } catch (error) {
    return common.sendFault(res, error)
  }
}
