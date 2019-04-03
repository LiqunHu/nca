const db = require('../../util/db')
const GLBConfig = require('../../util/GLBConfig')

module.exports = db.defineModel('tbl_integration_orderkujiale', {
  orderkujiale_id: {
    type: db.IDNO,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: db.ID,
    defaultValue: '',
    allowNull: false
  },
  order_id: {
    //订单号
    type: db.ID,
    allowNull: false
  },
  order_name: {
    //订单名称
    type: db.STRING(100),
    allowNull: true
  },
  order_address: {
    // 地址
    type: db.STRING(50),
    defaultValue: '',
    allowNull: false
  },
  appuid: {
    // username
    type: db.STRING(100),
    defaultValue: '',
    allowNull: false
  },
  desid: {
    // 酷家乐设计id
    type: db.STRING(50),
    defaultValue: '',
    allowNull: false
  },
  fpid: {
    // 酷家乐户型id
    type: db.STRING(50),
    defaultValue: '',
    allowNull: false
  },
  listingid: {
    // 酷家乐清单id
    type: db.STRING(50),
    defaultValue: '',
    allowNull: false
  },
  sync_state: {
    // 酷家乐清单同步状态 1 同步中 0 同步完成
    type: db.STRING(10),
    defaultValue: '0',
    allowNull: false
  },
  kujiale_planPic: {
    // 户型图片
    type: db.STRING(300),
    defaultValue: '',
    allowNull: false
  },
  kujiale_commName: {
    // 楼盘名称
    type: db.STRING(50),
    defaultValue: '',
    allowNull: false
  },
  kujiale_city: {
    // 城市
    type: db.STRING(100),
    defaultValue: '',
    allowNull: false
  },
  kujiale_srcArea: {
    // 建筑面积
    type: db.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  kujiale_specName: {
    // 户型
    type: db.STRING(50),
    defaultValue: '',
    allowNull: false
  },
  kujiale_houseName: {
    // 户型
    type: db.STRING(100),
    defaultValue: '',
    allowNull: false
  }
})
