/* 用户表 */
const CryptoJS = require('crypto-js')
const db = require('../../util/db')
const GLBConfig = require('../../util/GLBConfig')

module.exports = db.defineModel('tbl_integration_user', {
  user_id: {
    type: db.ID,
    primaryKey: true
  },
  phone: {
    type: db.STRING(20),
    defaultValue: '',
    allowNull: true
  },
  name: {
    type: db.STRING(100),
    defaultValue: '',
    allowNull: true
  },
  address: {
    type: db.STRING(100),
    defaultValue: '',
    allowNull: true
  },
  appuid: {
    // username
    type: db.STRING(100),
    defaultValue: '',
    allowNull: false
  }
})
