/* 酷家乐用户表 */
const db = require('../../util/db')

module.exports = db.defineModel('tbl_integration_user', {
  user_id: {
    // 用户id
    type: db.ID,
    primaryKey: true
  },
  phone: {
    // 手机号
    type: db.STRING(20),
    defaultValue: '',
    allowNull: true
  },
  name: {
    // 姓名
    type: db.STRING(100),
    defaultValue: '',
    allowNull: true
  },
  address: {
    // 地址
    type: db.STRING(100),
    defaultValue: '',
    allowNull: true
  },
  appuid: {
    // 酷家乐id
    type: db.STRING(100),
    defaultValue: '',
    allowNull: false
  }
})
