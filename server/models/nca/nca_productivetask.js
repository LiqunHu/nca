/** 生产任务*/
const db = require('../../util/db');
const GLBConfig = require('../../util/GLBConfig');

module.exports = db.defineModel('tbl_nca_productivetask', {
    productivetask_id: {
        type: db.IDNO,
        autoIncrement: true,
        primaryKey: true
    },
    productivetask_code: {
        type: db.STRING(50),
        allowNull: true
    },
    product_id: {//产品规划Id
        type: db.IDNO,
        allowNull: true
    },
    materiel_id: {
        type: db.IDNO,
        allowNull: true
    },
    domain_id: {
        type: db.IDNO,
        allowNull: true
    },
    product_level: {//产品层级，确定是否是最终的产品 暂不用
        type: db.IDNO,
        allowNull: true
    },
    taskdesign_number: {   //数量
        type: db.IDNO,
        defaultValue: 0,
        allowNull: true
    },
    stock_in_number: {//已入库数量
        type: db.IDNO,
        defaultValue: 0,
        allowNull: true
    },
    stock_in_state: {//入库状态
        type: db.STRING(4),
        defaultValue: '1',
        allowNull: true
    },
    stock_out_number: {//已出库数量
        type: db.IDNO,
        defaultValue: 0,
        allowNull: true
    },
    stock_out_state: {//出库状态
        type: db.STRING(4),
        defaultValue: '1',
        allowNull: true
    },
    order_id: {         //单号
        type: db.STRING(400),
        allowNull: true
    },
});
