const db = require('../../util/db')
const GLBConfig = require('../../util/GLBConfig')
// 酷家乐订单表

module.exports = db.defineModel('tbl_integration_orderkujiale_renderpic', {
  renderpic_id: {
    type: db.IDNO,
    autoIncrement: true,
    primaryKey: true
  },
  orderkujiale_id: {
    type: db.ID,
    allowNull: false
  },
  pic_id: {
    // 渲染图ID
    type: db.STRING(100),
    allowNull: true
  },
  pic_type: {
    // 渲染图类型。0表示普通渲染图，1表示全景图，3表示俯视图
    type: db.STRING(10),
    allowNull: true
  },
  pic_detail_type: {
    // 渲染图类型细分。取值枚举见附录
    type: db.STRING(10),
    allowNull: true
  },
  room_name: {
    // 渲染图所属房间的名字
    type: db.STRING(100),
    allowNull: true
  },
  img: {
    // 渲染图片
    type: db.STRING(200),
    allowNull: true
  },
  pano_link: {
    //全景图的链接地址
    type: db.STRING(200),
    allowNull: true
  },
  level: {
    // 渲染图所在房间的楼层信息
    type: db.INTEGER,
    allowNull: false
  }
})
