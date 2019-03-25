const moment = require('moment');
const common = require('../../../util/CommonUtil');
const GLBConfig = require('../../../util/GLBConfig');
const logger = require('../../../util/Logger').createLogger('ProduceControlSRV');
const model = require('../../../model');
const Sequence = require('../../../util/Sequence');

const FDomain = require('../../../bl/common/FunctionDomainBL');

const sequelize = model.sequelize;
const tb_common_apidomain = model.common_apidomain;
const tb_productionprocedure = model.nca_productionprocedure;

exports.NCAProductionProcedureControlResource = (req, res) => {
    let method = req.query.method;
    if (method === 'initProductionProcedure') {
        initProductionProcedure(req, res)
    } else if (method === 'searchProductionProcedure') {
        searchProductionProcedure(req, res)
    } else if (method === 'addProductionProcedure') {
        addProductionProcedure(req, res)
    } else if (method === 'modifyProductionProcedure') {
        modifyProductionProcedure(req, res)
    } else if (method === 'deleteProductionProcedure') {
        deleteProductionProcedure(req, res)
    } else {
        common.sendError(res, 'common_01');
    }
};

//获取基础信息信息
async function getProcedureType(req, domain_id) {
    let queryStr =
        `select t.*, rt.basetype_code, rt.basetype_name
         from tbl_nca_basetypedetail t
         left join tbl_nca_basetype rt
         on t.basetype_id = rt.basetype_id
         where t.state = 1
         and t.domain_id = ?`;

    const replacements = [domain_id];
    queryStr += ' order by t.created_at desc';
    const result = await common.queryWithCount(sequelize, req, queryStr, replacements);
    return result.data;
}

//获取固定资产验收详情信息
async function getFixedAssets(req, domain_id) {
    let queryStr =
        `select
         fad.fixedassetscheckdetail_id, fad.fixedassets_no, fad.fixedassets_name, fad.fixedassets_model, fad.fixedassets_unit
         , fac.fixedassetscheck_no
         from tbl_nca_fixedassetscheckdetail fad
         left join tbl_nca_fixedassetscheck fac
         on fad.fixedassetscheck_id = fac.fixedassetscheck_id
         where true
         and fac.check_state = 3
         and fac.state = 1
         and fad.state = 1
         and fac.domain_id = ?`;

    queryStr += ' order by fac.created_at desc';
    const replacements = [domain_id];
    const result = await common.queryWithCount(sequelize, req, queryStr, replacements);
    return result.data;
}

async function initProductionProcedure(req, res) {
    const returnData = {};
    const user = req.user;

    try {
        await FDomain.getDomainListInit(req, returnData);
        returnData.domainTypeInfo = GLBConfig.DOMAINTYPE; //单位
        returnData.statusInfo = GLBConfig.STATUSINFO; //生效状态
        returnData.procedureInfo = await getProcedureType(req, user.domain_id);
        returnData.procedureTypeInfo = returnData.procedureInfo.map(item => {
            return {
                id: item.basetypedetail_id,
                text: item.typedetail_name
            }
        });
        returnData.fixedAssetsInfo = await getFixedAssets(req, user.domain_id);
        returnData.deviceInfo = returnData.fixedAssetsInfo.map(item => {
            return {
                id: item.fixedassetscheckdetail_id,
                text: `${item.fixedassets_no} - ${item.fixedassets_name}`
            }
        });

        common.sendData(res, returnData)
    } catch (error) {
        common.sendFault(res, error);
    }
}

//获取产品信息
async function searchProductionProcedure(req, res) {
    const body = req.body;
    const user = req.user;
    const returnData = {};

    try {
        let queryStr =
            `select *
             from tbl_nca_productionprocedure pp
             where true
             and pp.state = 1
             and pp.domain_id = ?`;

        const replacements = [user.domain_id];

        if (body.search_text) {
            queryStr += ' and (pp.procedure_code like ? or pp.procedure_name like ?)';
            replacements.push('%' + body.search_text + '%');
            replacements.push('%' + body.search_text + '%');
        }

        const result = await common.queryWithCount(sequelize, req, queryStr, replacements);
        returnData.total = result.count;
        returnData.rows = result.data;
        common.sendData(res, returnData);
    } catch (error) {
        common.sendFault(res, error);
    }
}

//新增产品信息
async function addProductionProcedure(req, res) {
    const body = req.body;
    const user = req.user;

    try {
        let procedureResult = await tb_productionprocedure.findOne({
            where: {
                domain_id: user.domain_id,
                state: GLBConfig.ENABLE,
                procedure_code: body.procedure_code,
                procedure_name: body.procedure_name
            }
        });

        if (!procedureResult) {
            const addResult = await tb_productionprocedure.create({
                domain_id: user.domain_id,
                procedure_code: await Sequence.genProductionProcedureNo(),
                procedure_name: body.procedure_name,
                procedure_type: body.procedure_type,
                procedure_cost: body.procedure_cost,
                procedure_pay: body.procedure_pay,
                procedure_calc: body.procedure_calc,
                procedure_master_device: body.procedure_master_device,
                procedure_slave_device: body.procedure_slave_device
            });
            common.sendData(res, addResult);
        } else {
            common.sendError(res, 'procedure_02');
        }
    } catch (error) {
        common.sendFault(res, error);
    }
}

//修改产品信息
async function modifyProductionProcedure(req, res) {
    const body = req.body;
    const user = req.user;

    try {
        const procedureResult = await tb_productionprocedure.findOne({
            where: {
                procedure_id: body.old.procedure_id,
                domain_id: user.domain_id
            }
        });

        if (procedureResult) {
            procedureResult.procedure_name = body.new.procedure_name;
            procedureResult.procedure_type = body.new.procedure_type;
            procedureResult.procedure_cost = body.new.procedure_cost;
            procedureResult.procedure_pay = body.new.procedure_pay;
            procedureResult.procedure_calc = body.new.procedure_calc;
            procedureResult.procedure_master_device = body.new.procedure_master_device;
            procedureResult.procedure_slave_device = body.new.procedure_slave_device;
            await procedureResult.save();
            common.sendData(res, procedureResult);
        } else {
            common.sendError(res, 'procedure_01');
        }
    } catch (error) {
        return common.sendFault(res, error);
    }
}

//删除产品信息
async function deleteProductionProcedure(req, res) {
    try {
        const body = req.body;
        const user = req.user;

        let deleteResult = await tb_productionprocedure.findOne({
            where: {
                procedure_id: body.procedure_id,
                domain_id: user.domain_id,
                state: GLBConfig.ENABLE
            }
        });

        if (deleteResult) {
            deleteResult.state = GLBConfig.DISABLE;
            await deleteResult.save();
            common.sendData(res);
        } else {
            common.sendError(res, 'procedure_01');
        }
    } catch (error) {
        common.sendFault(res, error);
    }
}
