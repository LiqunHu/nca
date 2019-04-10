/** 套餐 **/
const db = require('../../util/db');
const GLBConfig = require('../../util/GLBConfig');

module.exports = db.defineModel('tbl_integration_ordermateriel', {
    ordermateriel_id: {
        type: db.IDNO,
        autoIncrement: true,
        primaryKey: true
    },
    room_id: {
        type: db.ID,
        allowNull: true
    },
    orderkujiale_id: {
        type: db.ID,
        allowNull: false
    },
    materiel_amount: { //数量
        type: db.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    kjl_type: { //酷家乐type
        type: db.STRING(20),
        allowNull: true
    },
    kjl_imageurl: { //酷家乐imageurl
        type: db.STRING(200),
        allowNull: true
    },
    kjl_name: { //酷家乐imageurl
        type: db.STRING(50),
        allowNull: true
    },
    kjl_brand: { //酷家乐brand
        type: db.STRING(50),
        allowNull: true
    },
    kjl_specification: { //酷家乐specification
        type: db.STRING(100),
        allowNull: true
    },
    kjl_unit: { //酷家乐unit
        type: db.STRING(10),
        allowNull: true
    },
    kjl_number: {
      type: db.DOUBLE,
      allowNull: true
    },
    kjl_unitprice: {
      type: db.DOUBLE,
      allowNull: true
    },
    kjl_realprice: {
      type: db.DOUBLE,
      allowNull: true
    },
    kjl_group: {
      type: db.STRING(10),
      allowNull: true
    }
});
