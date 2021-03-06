const common = require('./util/CommonUtil');
const Sequence = require('./util/Sequence');
const GLBConfig = require('./util/GLBConfig');
const logger = require('./util/Logger').createLogger('db');
const model = require('./model.js');

let tb_common_domain = model.common_domain;
let tb_common_user = model.common_user;
let tb_common_usergroup = model.common_usergroup;
let tb_common_api = model.common_api;
let tb_common_systemmenu = model.common_systemmenu;
let tb_process = model.nca_process;
let tb_taskallot = model.nca_taskallot;

(async() => {
    try {
        let menu = null
        let fmenuID1 = null
        let fmenuID2 = null
        let api = null
        let usergroup = null

        let domain = await tb_common_domain.create({
            domain: 'admin',
            domain_type: '0',
            domain_name: 'administratorGroup',
            domain_description: 'admin'
        });

        usergroup = await tb_common_usergroup.create({
            domain_id: domain.domain_id,
            usergroup_name: '业主',
            usergroup_type: GLBConfig.TYPE_CUSTOMER,
            node_type: '01',
            parent_id: 0,
            description: 'customer'
        });

        usergroup = await tb_common_usergroup.create({
            domain_id: domain.domain_id,
            usergroup_name: '工人',
            usergroup_type: GLBConfig.TYPE_WORKER,
            node_type: '01',
            parent_id: 0,
            description: 'administrator'
        });
        usergroup = await tb_common_usergroup.create({
            domain_id: domain.domain_id,
            usergroup_name: '工长',
            usergroup_type: GLBConfig.TYPE_FOREMAN,
            node_type: '01',
            parent_id: 0,
            description: 'administrator'
        });
        usergroup = await tb_common_usergroup.create({
            domain_id: domain.domain_id,
            usergroup_name: '监理',
            usergroup_type: GLBConfig.TYPE_SUPERVISION,
            node_type: '01',
            parent_id: 0,
            description: 'administrator'
        });

        usergroup = await tb_common_usergroup.create({
            domain_id: domain.domain_id,
            usergroup_name: 'administrator',
            usergroup_type: GLBConfig.TYPE_ADMINISTRATOR,
            node_type: '01',
            parent_id: 0,
            description: 'administrator'
        });

        let user = await tb_common_user.create({
            user_id: await Sequence.genUserID(),
            domain_id: domain.domain_id,
            usergroup_id: usergroup.usergroup_id,
            type: GLBConfig.TYPE_ADMINISTRATOR,
            username: 'admin',
            name: 'admin',
            password: 'admin'
        });

        // common
        menu = await tb_common_systemmenu.create({ systemmenu_name: 'common', node_type: '00', parent_id: '0'});
        fmenuID1 = menu.systemmenu_id

        menu = await tb_common_systemmenu.create({ systemmenu_name: 'components', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'机构选择组件', api_path: '/common/components/DomainSelectDialogControl', api_function: 'DOMAINSELECTDIALOGCONTROL', auth_flag: '0', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'操作员选择组件', api_path: '/common/components/userSelectDialogControl', api_function: 'USERSELECTDIALOGCONTROL', auth_flag: '0', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        menu = await tb_common_systemmenu.create({ systemmenu_name: 'baseconfig', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'关注审核', api_path: '/common/baseconfig/FollowerControl', api_function: 'FOLLOWERCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        menu = await tb_common_systemmenu.create({ systemmenu_name: 'system', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'系统菜单维护', api_path: '/common/system/SystemApiControl', api_function: 'SYSTEMAPICONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'机构模板维护', api_path: '/common/system/DomainTemplateControl', api_function: 'DOMAINTEMPLATECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'机构维护', api_path: '/common/system/DomainControl', api_function: 'DOMAINCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'系统组权限维护', api_path: '/common/system/SysGroupApiControl', api_function: 'SYSGROUPAPICONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'用户设置', api_path: '/common/system/UserSetting', api_function: 'USERSETTING', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'角色设置', api_path: '/common/system/DomainGroupControl', api_function: 'DOMAINGROUPCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'员工维护', api_path: '/common/system/OperatorControl', api_function: 'OPERATORCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'重置密码', api_path: '/common/system/ResetPassword', api_function: 'RESETPASSWORD', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        // nca
        menu = await tb_common_systemmenu.create({ systemmenu_name: 'nca', node_type: '00', parent_id: '0'});
        fmenuID1 = menu.systemmenu_id

        api = await tb_common_api.create({
            api_name: '物料采购表',
            api_path: '/nca/purchasemanage/NCAPurchaseListControl',
            api_function: 'NCAPURCHASELISTCONTROL',
            auth_flag: '1',
            show_flag: '1',
            api_kind: '1'
        });
        await tb_common_systemmenu.create({
            systemmenu_name: api.api_name,
            api_id: api.api_id,
            api_function: api.api_function,
            node_type: '01',
            parent_id: fmenuID1
        });

        api = await tb_common_api.create({
            api_name: '地产商楼盘管理',
            api_path: '/nca/baseconfig/NCALandAgentEstateControl',
            api_function: 'NCALANDAGENTESTATECONTROL',
            auth_flag: '1',
            show_flag: '1',
            api_kind: '1'
        });
        await tb_common_systemmenu.create({
            systemmenu_name: api.api_name,
            api_id: api.api_id,
            api_function: api.api_function,
            node_type: '01',
            parent_id: fmenuID1
        });

        api = await tb_common_api.create({
            api_name: '地产商订单管理',
            api_path: '/nca/ordermanage/NCALandAgentOrderControl',
            api_function: 'NCALANDAGENTORDERCONTROL',
            auth_flag: '1',
            show_flag: '1',
            api_kind: '1'
        });
        await tb_common_systemmenu.create({
            systemmenu_name: api.api_name,
            api_id: api.api_id,
            api_function: api.api_function,
            node_type: '01',
            parent_id: fmenuID1
        });

        menu = await tb_common_systemmenu.create({ systemmenu_name: '客户管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'客户管理', api_path: '/nca/customermanage/NCACustomerControl', api_function: 'NCACUSTOMERCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'预约管理', api_path: '/nca/customermanage/NCAAppointmentControl', api_function: 'NCAAPPOINTMENTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'询价管理', api_path: '/nca/customermanage/NCAInquiryControl', api_function: 'NCAINQUIRYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'总部客户查询', api_path: '/nca/customermanage/NCACustomerAssignControl', api_function: 'NCACUSTOMERASSIGNCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'投诉管理', api_path: '/nca/customermanage/NCAComplaintControl', api_function: 'NCACOMPLAINTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'贷款管理', api_path: '/nca/customermanage/NCALoanControl', api_function: 'NCALOANCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        menu = await tb_common_systemmenu.create({ systemmenu_name: '订单管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'订单管理', api_path: '/nca/ordermanage/NCAOrderControl', api_function: 'NCAORDERCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        // api = await tb_common_api.create({api_name:'地产商订单管理', api_path: '/api/nca/ordermanage/NCALandAgentOrderControl', api_function: 'NCALANDAGENTORDERCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        // menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'订单详情', api_path: '/nca/ordermanage/NCAOrderDetailControl', api_function: 'NCAORDERDETAILCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'团体订单详情', api_path: '/nca/ordermanage/NCAGOrderDetailControl', api_function: 'NCAGORDERDETAILCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'管理配置', api_path: '/nca/ordermanage/NCAOrderRequireControl', api_function: 'NCAORDERREQUIRECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'销售订单详情', api_path: '/nca/ordermanage/NCASOrderDetailControl', api_function: 'NCASORDERDETAILCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'总部订单查询', api_path: '/nca/ordermanage/NCAHDOrderControl', api_function: 'NCAHDORDERCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'总部订单详情', api_path: '/nca/ordermanage/NCAHDOrderDetailControl', api_function: 'NCAHDORDERDETAILCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});


        menu = await tb_common_systemmenu.create({ systemmenu_name: '运营数据管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'楼盘管理', api_path: '/nca/baseconfig/NCAEstateControl', api_function: 'NCAESTATECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        // api = await tb_common_api.create({api_name:'地产商楼盘管理', api_path: '/nca/baseconfig/NCALandAgentEstateControl', api_function: 'NCALANDAGENTESTATECONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        // menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'户型管理', api_path: '/nca/baseconfig/NCARoomTypeControl', api_function: 'NCAROOMTYPECONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'户型详情', api_path: '/nca/baseconfig/NCARoomTypeDetailControl', api_function: 'NCAROOMTYPEDETAILCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'物料维护', api_path: '/nca/baseconfig/NCAMaterielControl', api_function: 'NCAMATERIELCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'供应商维护', api_path: '/nca/baseconfig/NCASupplierControl', api_function: 'NCASUPPLIERCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'供应商物料维护', api_path: '/nca/baseconfig/NCASupplierMaterielControl', api_function: 'NCASUPPLIERMATERIELCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'地产商维护', api_path: '/nca/baseconfig/NCALandAgentControl', api_function: 'NCALANDAGENTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'签约工长维护', api_path: '/nca/baseconfig/NCAForemanControl', api_function: 'NCAFOREMANCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'产品维护', api_path: '/nca/baseconfig/NCAProduceControl', api_function: 'NCAPRODUCECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'造艺物料同步', api_path: '/nca/baseconfig/NCAMaterielSyncControl', api_function: 'NCAMATERIELSYNCCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'任务列表', api_path: '/nca/baseconfig/NCATaskListControl', api_function: 'NCATASKLISTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'工作流配置', api_path: '/nca/baseconfig/NCATaskAllotControl', api_function: 'NCATASKALLOTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'案例维护', api_path: '/nca/baseconfig/NCASiteConfigCaseControl', api_function: 'NCASITECONFIGCASECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'装修日记维护', api_path: '/nca/baseconfig/NCASiteConfigDiaryControl', api_function: 'NCASITECONFIGDIARYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'工人维护', api_path: '/nca/baseconfig/NCAWorkerControl', api_function: 'NCAWORKERCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'项目工程管理', api_path: '/nca/baseconfig/NCAProjectControl', api_function: 'NCAPROJECTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'公告管理', api_path: '/nca/baseconfig/NCANoticeControl', api_function: 'NCANOTICECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'人力需求管理', api_path: '/nca/baseconfig/NCAHumanResourceControl', api_function: 'NCAHUMANRESOURCECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'内容管理', api_path: '/nca/baseconfig/NCASmallProgramControl', api_function: 'NCASmallProgramControl', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'人工价格标准', api_path: '/nca/baseconfig/NCAWorkerPriceControl', api_function: 'NCAWORKERPRICECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'基础数据维护', api_path: '/nca/baseconfig/NCABaseDataControl', api_function: 'NCABASEDATACONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});


        menu = await tb_common_systemmenu.create({ systemmenu_name: '采购管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'采购管理', api_path: '/nca/purchasemanage/NCAPurchaseControl', api_function: 'NCAPURCHASECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        // api = await tb_common_api.create({api_name:'物料采购列表', api_path: '/nca/purchasemanage/NCAPurchaseListControl', api_function: 'NCAPURCHASELISTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        // menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'采购单详情', api_path: '/nca/purchasemanage/NCAPurchaseDetailControl', api_function: 'NCAPURCHASEDETAILCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'采购申请单详情', api_path: '/nca/purchasemanage/NCAPurchaseApplyDetailControl', api_function: 'NCAPURCHASEAPPLYDETAILCONTROL', auth_flag: '1', show_flag: '0', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        //品质管理
        menu = await tb_common_systemmenu.create({ systemmenu_name: '品质管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'品质录入', api_path: '/nca/purchasemanage/NCAQualityAddControl', api_function: 'NCAQUALITYADDCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'品质检验单', api_path: '/nca/purchasemanage/NCAQualityCheckControl', api_function: 'NCAQUALITYCHECKCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'退货单', api_path: '/nca/purchasemanage/NCAReturnNoteControl', api_function: 'NCARETURNNOTECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        //行政办公管理
        menu = await tb_common_systemmenu.create({ systemmenu_name: '行政办公管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'会议室维护', api_path: '/nca/baseconfig/NCAMeetingRoomControl', api_function: 'NCAMEETINGROOMCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'车辆维护', api_path: '/nca/baseconfig/NCAVehicleControl', api_function: 'NCAVEHICLECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'交通接待申请', api_path: '/nca/baseconfig/NCATransReceptionListControl', api_function: 'NCATRANSRECEPTIONLISTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'交通接待报销申请', api_path: '/nca/baseconfig/NCATransReceptionListExpenseControl', api_function: 'NCATRANSRECEPTIONLISTEXPENSECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'资金支出管理', api_path: '/nca/baseconfig/NCASpecialExpenseControl', api_function: 'NCASPECIALEXPENSECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'会议记录', api_path: '/nca/baseconfig/NCAMeetingMinuteControl', api_function: 'NCAMEETINGMINUTECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'会议管理', api_path: '/nca/baseconfig/NCAMeetingManageControl', api_function: 'NCAMEETINGMANAGECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'文控管理', api_path: '/nca/baseconfig/NCADocumentManagementControl', api_function: 'NCADOCUMENTMANAGEMENTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'文件通知', api_path: '/nca/baseconfig/NCADocumentNoticeControl', api_function: 'NCADOCUMENTNOTICECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        //WMS系统管理
        menu = await tb_common_systemmenu.create({ systemmenu_name: 'WMS系统管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id;
        api = await tb_common_api.create({api_name:'采购入库管理', api_path: '/nca/inventorymanage/NCABuyInControl', api_function: 'NCABUYINCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'采购入库流水', api_path: '/nca/inventorymanage/NCABuyInHistoryControl', api_function: 'NCABUYINHISTORYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'盘点管理', api_path: '/nca/inventorymanage/NCACheckInventoryControl', api_function: 'NCACHECKINVENTORYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'实时库存', api_path: '/nca/inventorymanage/NCAInventoryControl', api_function: 'NCAINVENTORYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'收发存明细', api_path: '/nca/inventorymanage/NCAInventoryDetailControl', api_function: 'NCAINVENTORYDETAILCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'销售出库管理', api_path: '/nca/inventorymanage/NCASaleOutControl', api_function: 'NCASALEOUTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'销售出库流水', api_path: '/nca/inventorymanage/NCASaleOutHistoryControl', api_function: 'NCASALEOUTHISTORYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'仓库管理', api_path: '/nca/inventorymanage/NCAWarehouseControl', api_function: 'NCAWAREHOUSECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'报废管理', api_path: '/nca/inventorymanage/NCAInvalidateControl', api_function: 'NCAINVALIDATECONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'出库申请', api_path: '/nca/inventorymanage/NCAStockOutApplyControl', api_function: 'NCASTOCKOUTAPPLYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'入库申请', api_path: '/nca/inventorymanage/NCAStockInApplyControl', api_function: 'NCASTOCKINAPPLYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'闲置库存申请', api_path: '/nca/inventorymanage/NCAIdleApplyControl', api_function: 'NCAIDLEAPPLYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        //生产管理
        menu = await tb_common_systemmenu.create({ systemmenu_name: '生产管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id;
        api = await tb_common_api.create({api_name:'生产主计划', api_path: '/nca/productionmanage/NCAMasterPlanControl', api_function: 'NCAMASTERPLANCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'生产周计划', api_path: '/nca/productionmanage/NCAWeeklyPlanControl', api_function: 'NCAWEEKLYPLANCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'生产日计划', api_path: '/nca/productionmanage/NCADailyPlanControl', api_function: 'NCADAILYPLANCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'});
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        //企业客户管理
        menu = await tb_common_systemmenu.create({ systemmenu_name: '企业客户管理', node_type: '00', parent_id: fmenuID1});
        fmenuID2 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'企业客户管理', api_path: '/nca/baseconfig/NCABusinessCustomerControl', api_function: 'NCABUSINESSCUSTOMERCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'企业客户管理', api_path: '/nca/baseconfig/NCACorporateClientsControl', api_function: 'NCACORPORATECLIENTSCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        // 长期资产管理
        menu = await tb_common_systemmenu.create({ systemmenu_name: '长期资产管理', node_type: '00', parent_id: fmenuID1});
        fmenuID1 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'低值易耗品管理', api_path: '/nca/longtermassets/NCAConsumablesControl', api_function: 'NCACONSUMABLESCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'资产盘点管理', api_path: '/nca/longtermassets/NCAAssetInventoryControl', api_function: 'NCAASSETINVENTORYCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'固定资产管理', api_path: '/nca/longtermassets/NCAFixedAssetsControl', api_function: 'NCAFIXEDASSETSCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});
        api = await tb_common_api.create({api_name:'资产报废管理', api_path: '/nca/longtermassets/NCAAssetRetirementControl', api_function: 'NCAASSETRETIREMENTCONTROL', auth_flag: '1', show_flag: '1', api_kind: '1'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID2});

        // 系统权限组
        menu = await tb_common_systemmenu.create({ systemmenu_name: 'sysauthgroup', node_type: '00', parent_id: '0'});
        fmenuID1 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'客户', api_path: '', api_function: 'GROUP_CUSTOMER', auth_flag: '1', show_flag: '0', sys_usergroup_type: GLBConfig.TYPE_CUSTOMER, api_kind: '3'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'工人', api_path: '', api_function: 'GROUP_WORKER', auth_flag: '1', show_flag: '0', sys_usergroup_type: GLBConfig.TYPE_WORKER, api_kind: '3'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'工长', api_path: '', api_function: 'GROUP_FOREMAN', auth_flag: '1', show_flag: '0', sys_usergroup_type: GLBConfig.TYPE_FOREMAN, api_kind: '3'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'监理', api_path: '', api_function: 'GROUP_SUPERVISION', auth_flag: '1', show_flag: '0', sys_usergroup_type: GLBConfig.TYPE_SUPERVISION, api_kind: '3'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});

        // mobile
        menu = await tb_common_systemmenu.create({ systemmenu_name: 'app', node_type: '00', parent_id: '0'});
        fmenuID1 = menu.systemmenu_id
        api = await tb_common_api.create({api_name:'appointment', api_path: '/mobile/appointment', api_function: 'APPOINTMENT', auth_flag: '0', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'quote', api_path: '/mobile/quote', api_function: 'QUOTE', auth_flag: '0', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'order', api_path: '/mobile/order', api_function: 'ORDER', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'user', api_path: '/mobile/user', api_function: 'USER', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'crew', api_path: '/mobile/crew', api_function: 'CREW', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'customer', api_path: '/mobile/customer', api_function: 'CUSTOMER', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'inquiry', api_path: '/mobile/inquiry', api_function: 'INQUIRY', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'feedback', api_path: '/mobile/feedback', api_function: 'FEEDBACK', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'materiel', api_path: '/mobile/materiel', api_function: 'MATERIEL', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'design', api_path: '/mobile/design', api_function: 'DESIGN', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'guest', api_path: '/mobile/guest', api_function: 'GUEST', auth_flag: '0', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'task', api_path: '/mobile/task', api_function: 'TASK', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'complaint', api_path: '/mobile/complaint', api_function: 'COMPLAINT', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});
        api = await tb_common_api.create({api_name:'node', api_path: '/mobile/node', api_function: 'NODE', auth_flag: '1', show_flag: '0', api_kind: '2'})
        menu = await tb_common_systemmenu.create({ systemmenu_name: api.api_name, api_id: api.api_id, api_function: api.api_function, node_type: '01', parent_id: fmenuID1});

        //global process data init
        await tb_process.create({process_name: '开工'});
        await tb_process.create({process_name: '拆改'});
        await tb_process.create({process_name: '水电'});
        await tb_process.create({process_name: '泥瓦'});
        await tb_process.create({process_name: '木工'});
        await tb_process.create({process_name: '油漆'});
        await tb_process.create({process_name: '安装'});
        await tb_process.create({process_name: '清洁'});
        await tb_process.create({process_name: '完工'});
        await tb_process.create({process_name: '污染治理'});
        await tb_process.create({process_name: '结构改造'});

        //taskallot data init
        await tb_taskallot.create({
            taskallot_id: 1,
            taskallot_name: '一般任务',
            taskallot_describe: '分配一般任务审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 2,
            taskallot_name: '采购申请',
            taskallot_describe: '分配采购申请审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 3,
            taskallot_name: '内部审核',
            taskallot_describe: '分配内部审核审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 4,
            taskallot_name: '生产计划',
            taskallot_describe: '分配生产计划审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 5,
            taskallot_name: '订单评审',
            taskallot_describe: '分配订单评审审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 6,
            taskallot_name: '订单验收',
            taskallot_describe: '分配订单验收审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 7,
            taskallot_name: '物料审核',
            taskallot_describe: '分配物料审核审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 9,
            taskallot_name: '报废申请',
            taskallot_describe: '分配报废申请审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 10,
            taskallot_name: '入库申请',
            taskallot_describe: '分配出库申请审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 11,
            taskallot_name: '出库申请',
            taskallot_describe: '分配出库申请审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 14,
            taskallot_name: '公告通知',
            taskallot_describe: '分配公告通知审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 15,
            taskallot_name: '人力需求管理',
            taskallot_describe: '分配招录任务'
        });
        await tb_taskallot.create({
            taskallot_id: 16,
            taskallot_name: '退货任务',
            taskallot_describe: '处理退货请求'
        });
        await tb_taskallot.create({
            taskallot_id: 17,
            taskallot_name: '闲置库存申请',
            taskallot_describe: '分配闲置库存申请审核人员'
        });
        await tb_taskallot.create({
            taskallot_id: 18,
            taskallot_name: '会议通知',
            taskallot_describe: '会议通知与会人员'
        });
        await tb_taskallot.create({
            taskallot_id: 19,
            taskallot_name: '会议跟进事项',
            taskallot_describe: '通知会议跟进事项责任人'
        });

        process.exit(0)
    } catch (error) {
        console.log(error);
    }
})();
