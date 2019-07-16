const rp = require('request-promise')
const moment = require('moment')
const querystring = require('querystring')

const common = require('../../util/CommonUtil')
const GLBConfig = require('../../util/GLBConfig')
const logger = require('../../util/Logger').createLogger('ZoweeInterfaceSRV')
const model = require('../../model')

const tb_orderkujiale = model.integration_orderkujiale
const tb_user = model.integration_user
const tb_orderroom = model.integration_orderroom
const tb_ordermateriel = model.integration_ordermateriel
const tb_renderpic = model.integration_orderkujiale_renderpic

exports.KujialeControlResource = (req, res) => {
  let method = req.query.method
  if (method === 'getIframeSrc') {
    getIframeSrcAct(req, res)
  } else if (method === 'getNewIframeSrc') {
    getNewIframeSrcAct(req, res)
  } else if (method === 'queryStandard') {
    queryStandardAct(req, res)
  } else if (method === 'queryDesign') {
    queryDesignAct(req, res)
  } else if (method === 'changeDesignName') {
    changeDesignNameAct(req, res)
  } else if (method === 'generateKJL') {
    generateKJLAct(req, res)
  } else if (method === 'kjlSync') {
    kjlSyncAct(req, res)
  } else if (method === 'bind') {
    bindAct(req, res)
  } else {
    common.sendError(res, 'common_01')
  }
}

exports.KujialeGetControlResource = (req, res) => {
  let method = req.query.method
  if (method === 'queryEstate') {
    queryEstateAct(req, res)
  } else {
    common.sendError(res, 'common_01')
  }
}

function getAuthString(appuid, queryPara) {
  let appkey = '9Gb5NA8TIf'
  let appsecret = 'A5CWcaN396kVNQSrDhRTSY0AMNv4PDiC'
  let timestamp = moment().valueOf()
  let authString = ''

  if (appuid) {
    let sign = require('crypto')
      .createHash('md5')
      .update(appsecret + appkey + appuid + timestamp)
      .digest('hex')
    authString = querystring.stringify({
      appkey: appkey,
      timestamp: timestamp,
      appuid: appuid,
      sign: sign
    })
  } else {
    let sign = require('crypto')
      .createHash('md5')
      .update(appsecret + appkey + timestamp)
      .digest('hex')
    authString = querystring.stringify({
      appkey: appkey,
      timestamp: timestamp,
      sign: sign
    })
  }

  if (queryPara) {
    paraString = querystring.stringify(queryPara)
    authString += '&' + paraString
  }

  return '?' + authString
}

async function getAccessToken(user) {
  try {
    let requestData = {
      name: user.name,
      telephone: user.phone,
      type: 0
    }
    let options = {
      method: 'POST',
      uri: 'https://openapi.kujiale.com/v2/login' + getAuthString(user.appuid),
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: requestData
    }

    let body = await rp(options)
    return body.d
  } catch (error) {
    throw error
  }
}

let getIframeSrcAct = async (req, res) => {
  try {
    let doc = common.docTrim(req.body),
      planId = '',
      designId = '',
      token = '',
      hName = '',
      dsinfo

    if (doc.design_id) {
      let orderkujiale = await tb_orderkujiale.findOne({
        where: {
          design_id: doc.design_id
        }
      })

      let user = await tb_user.findOne({
        where: {
          user_id: orderkujiale.user_id
        }
      })

      if (!orderkujiale.desid) {
        appuid = user.appuid
        token = await getAccessToken(user)
        if (orderkujiale.fpid) {
          planId = orderkujiale.fpid
        } else {
          if (doc.planId) {
            let cpop = {
              method: 'POST',
              uri:
                'https://openapi.kujiale.com/v2/floorplan/' +
                doc.planId +
                '/copy' +
                getAuthString(user.appuid, {}),
              headers: {
                'content-type': 'text/plain;charset=utf-8'
              }
            }

            let fp = await rp(cpop)
            planId = JSON.parse(fp).d.planId
          }
        }

        if (!doc.designId) {
          let options = {
            method: 'POST',
            uri:
              'https://openapi.kujiale.com/v2/design/creation' +
              getAuthString(user.appuid, {
                plan_id: planId
              }),
            headers: {
              'content-type': 'text/plain;charset=utf-8'
            }
          }
          let body = await rp(options)
          designId = JSON.parse(body).d
        } else {
          let options = {
            method: 'POST',
            uri:
              'https://openapi.kujiale.com/v2/design/' +
              doc.designId +
              '/copy' +
              getAuthString(user.appuid, {}),
            headers: {
              'content-type': 'text/plain;charset=utf-8'
            }
          }
          let body = await rp(options)
          designId = JSON.parse(body).d
        }

        // let url =
        //   'https://openapi.kujiale.com/v2/design/' +
        //   designId +
        //   '/basic' +
        //   getAuthString('', {designId: designId})
        // let info = await rp(url)
        // dsinfo = JSON.parse(info).d

        // orderkujiale.fpid = dsinfo.planId
        // orderkujiale.desid = dsinfo.designId
        // orderkujiale.kujiale_planPic = dsinfo.planPic
        // orderkujiale.kujiale_commName = dsinfo.commName
        // orderkujiale.kujiale_city = dsinfo.city
        // orderkujiale.kujiale_srcArea = dsinfo.srcArea
        // orderkujiale.kujiale_specName = dsinfo.specName

        let url =
          'https://openapi.kujiale.com/v2/floorplan/' +
          planId +
          '/basic' +
          getAuthString('', {})
        let info = await rp(url)
        dsinfo = JSON.parse(info).d

        orderkujiale.fpid = planId
        orderkujiale.desid = designId
        orderkujiale.kujiale_planPic = dsinfo.planPic
        orderkujiale.kujiale_commName = dsinfo.commName
        orderkujiale.kujiale_city = dsinfo.city
        orderkujiale.kujiale_srcArea = dsinfo.srcArea
        orderkujiale.kujiale_specName = dsinfo.specName
        orderkujiale.kujiale_houseName = dsinfo.name
        await orderkujiale.save()
      } else {
        appuid = orderkujiale.appuid
        designId = orderkujiale.desid
        token = await getAccessToken(user)
      }
      hName = orderkujiale.kujiale_houseName
    } else {
      return common.sendError(res, 'kujiale_05')
      // appuid = user.username
      // token = await getAccessToken(user)
      // if (doc.designId) {
      //   let options = {
      //     method: 'POST',
      //     uri:
      //       'https://openapi.kujiale.com/v2/design/' +
      //       doc.designId +
      //       '/copy' +
      //       getAuthString(appuid, {}),
      //     headers: {
      //       'content-type': 'text/plain;charset=utf-8'
      //     }
      //   }
      //   let body = await rp(options)
      //   designId = JSON.parse(body).d
      // } else {
      //   if (doc.planId) {
      //     let cpop = {
      //       method: 'POST',
      //       uri:
      //         'https://openapi.kujiale.com/v2/floorplan/' +
      //         doc.planId +
      //         '/copy' +
      //         getAuthString(appuid, {}),
      //       headers: {
      //         'content-type': 'text/plain;charset=utf-8'
      //       }
      //     }

      //     let fp = await rp(cpop)

      //     let options = {
      //       method: 'POST',
      //       uri:
      //         'https://openapi.kujiale.com/v2/design/creation' +
      //         getAuthString(appuid, {
      //           plan_id: JSON.parse(fp).d.planId
      //         }),
      //       headers: {
      //         'content-type': 'text/plain;charset=utf-8'
      //       }
      //     }
      //     let body = await rp(options)
      //     designId = JSON.parse(body).d
      //   } else {
      //     return common.sendError(res, 'kujiale_05')
      //   }
      // }
    }

    let queryPara = {
      accesstoken: token,
      designid: designId,
      dest: 1
    }

    let url =
      'https://www.kujiale.com/v/auth?' + querystring.stringify(queryPara)

    return common.sendData(res, {
      iframeurl: url,
      name: hName
    })
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let getNewIframeSrcAct = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let user = await tb_user.findOne({
      where: {
        user_id: doc.user_id
      }
    })

    let token = await getAccessToken(user)

    let queryPara = {
      accesstoken: token,
      dest: 0
    }

    let url =
      'https://www.kujiale.com/v/auth?' + querystring.stringify(queryPara)

    return common.sendData(res, {
      iframeurl: url
    })
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let queryStandardAct = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)
    let returnData = {
      results: []
    }
    if (doc.search_text && doc.province) {
      let city_id = common.searchKujialeCityid(doc.province, doc.city)
      let queryPara = {
        start: 0,
        num: 50,
        q: doc.search_text,
        city_id: city_id
      }
      if (doc.count) {
        queryPara.room_count = parseInt(doc.count)
      }
      if (doc.min) {
        queryPara.area_min = parseInt(doc.min)
      }
      if (doc.max) {
        queryPara.area_max = parseInt(doc.max)
      }
      let hasMore = true
      let url = ''
      while (hasMore) {
        url =
          'https://openapi.kujiale.com/v2/floorplan/standard' +
          getAuthString('', queryPara)
        let standard = await rp(url)
        standard = JSON.parse(standard)
        hasMore = standard.d.hasMore
        for (let h of standard.d.result) {
          returnData.results.push(h)
        }
        queryPara.start += queryPara.num
      }
    }
    common.sendData(res, returnData)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let queryDesignAct = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)
    let returnData = {
      results: []
    }

    let queryPara = {
      start: 0,
      num: 50,
      status: 1,
      appuid: doc.appuid
    }

    if (doc.search_text) {
      queryPara.keyword = doc.search_text
    }

    let hasMore = true
    let url = ''
    while (hasMore) {
      url =
        'https://openapi.kujiale.com/v2/design/list' +
        getAuthString(doc.appuid, queryPara)
      let designs = await rp(url)
      designs = JSON.parse(designs)
      hasMore = designs.d.hasMore
      for (let d of designs.d.result) {
        returnData.results.push(d)
      }
      queryPara.start += queryPara.num
    }

    common.sendData(res, returnData)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let changeDesignNameAct = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let options = {
      method: 'POST',
      uri:
        'https://openapi.kujiale.com/v2/design/' +
        doc.designId +
        '/basic' +
        getAuthString('', {}),
      json: true,
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: {
        name: doc.name
      }
    }
    let body = await rp(options)

    common.sendData(res)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let generateKJLAct = async (req, res) => {
  try {
    let doc = common.docTrim(req.body),
      url

    let orderkujiale = await tb_orderkujiale.findOne({
      where: {
        design_id: doc.design_id
      }
    })

    // 产生物料清单
    if (!orderkujiale.listingid) {
      url =
        'https://openapi.kujiale.com/v2/listing/init' +
        getAuthString('', {
          design_id: orderkujiale.desid
        })
      let init = await rp(url)
      init = JSON.parse(init)
      orderkujiale.listingid = init.d
      await orderkujiale.save()
    }

    let options = {
      method: 'POST',
      uri:
        'https://openapi.kujiale.com/v2/listing/' +
        orderkujiale.listingid +
        '/sync' +
        getAuthString('', {
          appuid: orderkujiale.appuid
        }),
      headers: {
        'content-type': 'text/plain;charset=utf-8'
      }
    }
    let sync = await rp(options)
    sync = JSON.parse(sync)
    if (sync.c !== '0') {
      return common.sendError(res, 'kujiale_11')
    }

    // 生成 CAD
    options = {
      method: 'POST',
      uri:
        'https://openapi.kujiale.com/v2/design/' +
        orderkujiale.desid +
        '/cd' +
        getAuthString('', {}),
      json: true,
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: [20]
    }
    let body = await rp(options)
    if (body.c !== '0') {
      return common.sendError(res, 'kujiale_11')
    }
    return common.sendData(res)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let kjlSyncAct = async (req, res) => {
  try {
    let doc = common.docTrim(req.body),
      url

    let orderkujiale = await tb_orderkujiale.findOne({
      where: {
        design_id: doc.design_id
      }
    })

    url =
      'https://openapi.kujiale.com/v2/listing/' +
      orderkujiale.listingid +
      '/state' +
      getAuthString('', {
        listingId: orderkujiale.listingid
      })
    let state = await rp(url)
    state = JSON.parse(state)

    if (state.d != '3') {
      return common.sendError(res, 'kujiale_01')
    }

    //获取总览
    url =
      'https://openapi.kujiale.com/v2/listing/' +
      orderkujiale.listingid +
      '/brief' +
      getAuthString('', {
        listingId: orderkujiale.listingid
      })
    let brief = await rp(url)
    brief = JSON.parse(brief)

    //获取空间
    url =
      'https://openapi.kujiale.com/v2/listing/' +
      orderkujiale.listingid +
      '/project/detail' +
      getAuthString('', {
        listingId: orderkujiale.listingid
      })
    let detail = await rp(url)
    detail = JSON.parse(detail)

    if (detail.d.length > 0) {
      await common.transaction(async function(t) {
        orderkujiale.orderkujiale_house_area = brief.d.floorArea
        await orderkujiale.save({
          transaction: t
        })

        await tb_orderroom.destroy({
          where: {
            orderkujiale_id: orderkujiale.orderkujiale_id
          },
          transaction: t
        })

        await tb_ordermateriel.destroy({
          where: {
            orderkujiale_id: orderkujiale.orderkujiale_id
          },
          transaction: t
        })

        // 硬装
        url =
          'https://openapi.kujiale.com/v2/listing/' +
          orderkujiale.listingid +
          '/hard/outfit/detail' +
          getAuthString('', {
            listingId: orderkujiale.listingid
          })
        let hardOutfitDetail = await rp(url)
        hardOutfitDetail = JSON.parse(hardOutfitDetail)

        // 软装
        url =
          'https://openapi.kujiale.com/v2/listing/' +
          orderkujiale.listingid +
          '/soft/outfit/detail' +
          getAuthString('', {
            listingId: orderkujiale.listingid
          })
        let softOutfitDetail = await rp(url)
        softOutfitDetail = JSON.parse(softOutfitDetail)

        // // 橱柜
        // url = "https://openapi.kujiale.com/v2/listing/" + orderkujiale.listingid + "/custom/cupboard/detail" + getAuthString('', {
        //     listingId: orderkujiale.listingid
        // })
        // let customCupboardDetail = await rp(url)
        // customCupboardDetail = JSON.parse(customCupboardDetail)
        //
        // // 衣柜
        // url = "https://openapi.kujiale.com/v2/listing/" + orderkujiale.listingid + "/custom/wardrobe/detail" + getAuthString('', {
        //     listingId: orderkujiale.listingid
        // })
        // let customWardrobeDetail = await rp(url)
        // customWardrobeDetail = JSON.parse(customWardrobeDetail)

        // function searchRoomType(room_name) {
        //   for (let rt of GLBConfig.ROOMTYPE) {
        //     if (room_name === '起居室') {
        //       return '2'
        //     }
        //     if (room_name.search(rt.text) >= 0) {
        //       return rt.id
        //     }
        //   }
        //   return '20'
        // }

        for (let r of detail.d) {
          let room = await tb_orderroom.create(
            {
              orderkujiale_id: orderkujiale.orderkujiale_id,
              room_name: r.typeName,
              room_area: r.groundArea,
              wall_area: r.wall_area,
              ground_perimeter: r.ground_perimeter,
              kjl_room_id: r.roomId
            },
            {
              transaction: t
            }
          )

          //硬装
          for (let ho of hardOutfitDetail.d) {
            if (ho.roomId === r.roomId) {
              for (let m of ho.hardOutfits) {
                if (m.code) {
                  await tb_ordermateriel.create(
                    {
                      room_id: room.room_id,
                      orderkujiale_id: orderkujiale.orderkujiale_id,
                      materiel_amount: Math.ceil(m.number),
                      materiel_code: m.code,
                      kjl_type: m.type,
                      kjl_imageurl: m.imageUrl,
                      kjl_name: m.name,
                      kjl_brand: m.brand,
                      kjl_specification: m.specification,
                      kjl_unit: m.unit,
                      kjl_number: m.number,
                      kjl_unitprice: m.unitPrice,
                      kjl_realprice: m.realPrice,
                      kjl_group: '硬装'
                    },
                    {
                      transaction: t
                    }
                  )
                }
              }
            }
          } //硬装

          //软装
          for (let so of softOutfitDetail.d) {
            if (so.roomId === r.roomId) {
              for (let m of so.softOutfits) {
                if (m.code) {
                  await tb_ordermateriel.create(
                    {
                      room_id: room.room_id,
                      orderkujiale_id: orderkujiale.orderkujiale_id,
                      materiel_amount: Math.ceil(m.number),
                      materiel_code: m.code,
                      kjl_type: m.type,
                      kjl_imageurl: m.imageUrl,
                      kjl_name: m.name,
                      kjl_brand: m.brand,
                      kjl_specification: m.specification,
                      kjl_unit: m.unit,
                      kjl_number: m.number,
                      kjl_unitprice: m.unitPrice,
                      kjl_realprice: m.realPrice,
                      kjl_group: '软装'
                    },
                    {
                      transaction: t
                    }
                  )
                }
              }
            }
          } //软装
        }
      })
    }

    // 获取CAD图
    url =
      'https://openapi.kujiale.com/v2/design/' +
      orderkujiale.desid +
      '/cd' +
      getAuthString('', {})
    let body = await rp(url)
    let standard = JSON.parse(body)
    if (standard.c !== '0') {
      return common.sendError(res, 'kujiale_11')
    }
    orderkujiale.orderkujiale_cad_url = standard.d.constructionUrl
    await orderkujiale.save()

    // 渲染图 漫游图
    let result = [],
      start = 0,
      page = 50,
      hasMore = true

    while (hasMore) {
      url =
        'https://openapi.kujiale.com/v2/renderpic/list' +
        getAuthString('', {
          design_id: orderkujiale.desid,
          start: start,
          num: page
        })
      let standard = await rp(url)
      standard = JSON.parse(standard)
      hasMore = standard.d.hasMore
      for (let h of standard.d.result) {
        result.push(h)
      }
      start += page
    }

    await tb_renderpic.destroy({
      where: {
        orderkujiale_id: orderkujiale.orderkujiale_id
      }
    })
    let picData = []
    for (let r of result) {
      await tb_renderpic.create({
        orderkujiale_id: orderkujiale.orderkujiale_id,
        pic_id: r.picId,
        pic_type: r.picType,
        pic_detail_type: r.picDetailType,
        room_name: r.roomName,
        img: r.img,
        pano_link: r.panoLink,
        level: r.level
      })
      picData.push({ room: r.roomName, effectPic: r.img })
    }

    let rendpics = []
    for (let r of result) {
      if (r.picType === 0) {
        rendpics.push(r.picId)
      }
    }

    let options = {
      method: 'POST',
      uri:
        'https://openapi.kujiale.com/v2/renderpic/pano' + getAuthString('', {}),
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        picIds: rendpics,
        override: false
      }
    }

    let rpic = await rp(options)
    orderkujiale.orderkujiale_renderpic_url = rpic.d
    await orderkujiale.save()

    // 调用销售易接口
    let syoptions = {
      method: 'POST',
      uri:
        'https://n2cs.dingdingxiujia.com/api/xiaoshouyi/design/PlanSync/kjlPlanSync',
      formData: {
        name: orderkujiale.design_name,
        siteId: orderkujiale.houses_id,
        designId: orderkujiale.design_id,
        houseImg: orderkujiale.kujiale_planPic,
        area: String(orderkujiale.kujiale_srcArea),
        type: orderkujiale.kujiale_houseName,
        cad: orderkujiale.orderkujiale_cad_url || '',
        panoramaImg: orderkujiale.orderkujiale_renderpic_url || '',
        materielCode: '',
        ownerid: orderkujiale.appuid
      }
    }
    console.log(syoptions)

    let sybody = await rp(syoptions)
    logger.info(sybody)

    let picoptions = {
      method: 'POST',
      uri:
        'https://n2cs.dingdingxiujia.com/api/xiaoshouyi/design/PlanSync/kjlEffectSync',
      formData: {
        designId: orderkujiale.design_id,
        data: JSON.stringify(picData)
      }
    }

    let picbody = await rp(picoptions)
    logger.info(picbody)

    return common.sendData(res)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let bindAct = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)

    let user = {
      name: doc.name,
      telephone: doc.phone,
      appuid: doc.appuid
    }
    await getAccessToken(user)

    let options = {
      method: 'POST',
      uri:
        'https://openapi.kujiale.com/v2/user/bind' +
        getAuthString(doc.appuid, {}),
      json: true,
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: {
        email: doc.email
      }
    }
    let body = await rp(options)
    let result
    if (typeof body === 'object') {
      result = body
    } else {
      result = JSON.parse(body)
    }

    if (result.c !== '0') {
      return common.sendError(res, '', result.m)
    }
    common.sendData(res)
    return common.sendData(res)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

let queryEstateAct = async (req, res) => {
  try {
    let doc = req.query
    let returnData = {
      results: [],
      pagination: {
        more: false
      }
    }
    if (doc.search_text && doc.province) {
      let city_id = common.searchKujialeCityid(doc.province, doc.city)
      let url =
        'https://openapi.kujiale.com/v2/floorplan/standard' +
        getAuthString('', {
          start: 0,
          num: 50,
          q: doc.search_text,
          city_id: city_id
        })
      let standard = await rp(url)
      standard = JSON.parse(standard)
      let tempName = []
      for (let e of standard.d.result) {
        tempName.push(e.commName)
      }
      let estateName = Array.from(new Set(tempName))
      let i = 1
      for (let e of estateName) {
        returnData.results.push({
          id: i,
          text: e
        })
        i += 1
      }
    }
    res.send(returnData)
  } catch (error) {
    return common.sendFault(res, error)
  }
}

exports.getStandards = async (province, city, estateName) => {
  try {
    let result = [],
      room_list = [1, 2, 3, 4, 5],
      url = ''
    let city_id = common.searchKujialeCityid(province, city)
    for (let rc of room_list) {
      let start = 0,
        page = 50,
        hasMore = true
      while (hasMore) {
        url =
          'https://openapi.kujiale.com/v2/floorplan/standard' +
          getAuthString('', {
            start: start,
            num: page,
            q: estateName,
            room_count: rc,
            city_id: city_id
          })
        let standard = await rp(url)
        standard = JSON.parse(standard)
        hasMore = standard.d.hasMore
        for (let h of standard.d.result) {
          h.room_count = rc
          result.push(h)
        }
        start += page
      }
    }
    return result
  } catch (error) {
    throw error
  }
}

exports.getRenderpic = async (req, res) => {
  try {
    let doc = common.docTrim(req.body)
    let url =
      'https://openapi.kujiale.com/v2/renderpic/list' +
      getAuthString('', {
        design_id: doc.design_id,
        start: doc.start,
        num: doc.num
      })
    let standard = await rp(url)
    common.sendData(res, JSON.parse(standard))
  } catch (error) {
    throw error
  }
}

async function getEmailAccessToken(userId, username) {
  try {
    let user = await tb_user.findOne({
      where: {
        user_id: userId,
        state: '1'
      }
    })
    let avatar = user.avatar
    if (avatar) {
      avatar += 'http://www.ncahouse.com'
    } else {
      avatar = 'http://www.ncahouse.com/static/images/base/head.jpg'
    }
    let requestData = {
      name: user.name,
      email: user.email,
      telephone: user.phone,
      avatar: avatar,
      type: 0
    }
    let options = {
      method: 'POST',
      uri: 'https://openapi.kujiale.com/v2/login' + getAuthString(username),
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: requestData
    }

    let body = await rp(options)
    return body.d
  } catch (error) {
    throw error
  }
}
