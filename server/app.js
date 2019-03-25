const log4js = require('log4js');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

const config = require('./config');
const common = require('./util/CommonUtil.js');
const logger = require('./util/Logger').createLogger('app.js');

let app = express();
let cors = require('cors')
let ejs = require('ejs');

let authority = require('./util/Authority')
let AuthSRV = require('./util/AuthSRV')
let FileSRV = require('./util/FileSRV')
let services = require('./service')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/temp', express.static(path.join(__dirname, '../public/temp')))
if (config.mongoFlag == false) {
    app.use('/files', express.static(path.join(__dirname, 'public/files')))
}
app.use(log4js.connectLogger(log4js.getLogger("http"), {
    level: 'auto',
    nolog: '\\.gif|\\.jpg$'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.text({
    type: 'text/*'
}));
app.use(bodyParser.raw());
app.use(cookieParser());
app.use('/api', authority.AuthMiddleware);

//处理webpack服务请求
app.get('/__webpack_hmr', function (req, res) {
    res.send('')
})

app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.get('/files/:filetag', FileSRV.FileResource);

app.post('/api/test', services.TestSRV.TestResource);
app.get('/api/test', services.TestSRV.TestResource);
app.post('/api/auth', AuthSRV.AuthResource);
app.post('/api/phoneresetpassword', AuthSRV.PhoneResetPasswordResource);
app.post('/api/signout', AuthSRV.SignOutResource);
app.post('/api/sms', AuthSRV.SMSResource);

// system

//common
//commonQuery
app.post('/api/common/components/userSelectDialogControl', services.UserSelectDialogSRV.UserSelectDialogResource);
app.post('/api/common/components/DomainSelectDialogControl', services.DomainSelectDialogSRV.DomainSelectDialogResource);

// baseconfig
app.post('/api/common/baseconfig/FollowerControl', services.FollowerControlSRV.FollowerControlResource);

// system
app.post('/api/common/system/SystemApiControl', services.SystemApiControlSRV.SystemApiControlResource);
app.post('/api/common/system/DomainTemplateControl', services.DomainTemplateControlSRV.DomainTemplateControlResource);
app.post('/api/common/system/DomainControl', services.DomainControlSRV.DomainControlResource);
app.post('/api/common/system/DomainGroupControl', services.DomainGroupControlSRV.DomainGroupControlResource);
app.post('/api/common/system/SysGroupApiControl', services.SysGroupApiControlSRV.SysGroupApiControlResource);
app.post('/api/common/system/OperatorControl', services.OperatorControlSRV.OperatorControlResource);
app.post('/api/common/system/UserSetting', services.UserSettingSRV.UserSettingResource);
app.post('/api/common/system/ResetPassword', services.UserResetPasswordSRV.UserResetPasswordResource);

// nca
// register
app.post('/api/nca/register', services.NCARegisterControlSRV.NCARegisterResource);

// customermanage
app.post('/api/nca/customermanage/NCACustomerControl', services.NCACustomerControlSRV.NCACustomerControlResource);
app.post('/api/nca/customermanage/NCAAppointmentControl', services.NCAAppointmentControlSRV.NCAAppointmentControlResource);
app.post('/api/nca/customermanage/NCAInquiryControlControl', services.NCAInquiryControlSRV.NCAInquiryControlResource);
app.post('/api/nca/customermanage/NCACustomerAssignControl', services.NCACustomerAssignControlSRV.NCACustomerAssignControlResource);
app.post('/api/nca/customermanage/NCAComplaintControl', services.NCAComplaintControlSRV.NCAComplaintControlResource);
app.post('/api/nca/customermanage/NCALoanControl', services.NCALoanControlSRV.NCALoanControlResource);

// ordermanage
app.post('/api/nca/ordermanage/NCAOrderControl', services.NCAOrderControlSRV.NCAOrderControlResource);
app.post('/api/nca/ordermanage/NCALandAgentOrderControl', services.NCAOrderControlSRV.NCAOrderControlResource);
app.post('/api/nca/ordermanage/NCAOrderDetailControl', services.NCAOrderDetailControlSRV.NCAOrderDetailControlResource);
app.post('/api/nca/ordermanage/NCAGOrderDetailControl', services.NCAGOrderDetailControlSRV.NCAGOrderDetailControlResource);
app.post('/api/nca/ordermanage/NCAOrderRequireControl', services.NCAOrderRequireControlSRV.OrderRequireControlResource);
app.post('/api/nca/ordermanage/NCASOrderDetailControl', services.NCASOrderDetailControlSRV.NCASOrderDetailControlResource);
app.post('/api/nca/ordermanage/NCAHDOrderControl', services.NCAHDOrderControlSRV.NCAHDOrderControlResource);
app.post('/api/nca/ordermanage/NCAHDOrderDetailControl', services.NCAHDOrderDetailControlSRV.NCAHDOrderDetailControlResource);
app.post('/api/nca/ordermanage/NCAOrderShopSyncControl', services.NCAOrderShopSyncControlSRV.NCAOrderShopSyncControlResource);
app.post('/api/nca/ordermanage/NCAOrderSearchControl', services.NCAOrderSearchControlSRV.NCAOrderSearchControlResource);
app.post('/api/nca/ordermanage/NCAReceivablesRuleControl', services.NCAReceivablesRuleControlSRV.NCAReceivablesRuleControlResource);
app.post('/api/nca/ordermanage/NCASaleOrderInstitutionsControl', services.NCASaleOrderInstitutionsControlSRV.NCASaleOrderInstitutionsControlResource);
app.post('/api/nca/ordermanage/NCASaleOrderControl', services.NCASaleOrderControlSRV.NCASaleOrderControlResource);
app.post('/api/nca/ordermanage/NCASaleOrderCompanyControl', services.NCASaleOrderCompanyControlSRV.NCASaleOrderCompanyControlResource);
app.post('/api/nca/ordermanage/NCAOrderReviewControl', services.NCAOrderReviewControlSRV.NCAOrderReviewControlResource);

// baseconfig
app.post('/api/nca/baseconfig/NCAEstateControl', services.NCAEstateControlSRV.NCAEstateControlResource);
app.post('/api/nca/baseconfig/NCALandAgentEstateControl', services.NCAEstateControlSRV.NCAEstateControlResource);
app.post('/api/nca/baseconfig/NCARoomTypeControl', services.NCARoomTypeControlSRV.NCARoomTypeControlResource);
app.post('/api/nca/baseconfig/NCARoomTypeDetailControl', services.NCARoomTypeDetailControlSRV.NCARoomTypeDetailControlResource);
app.post('/api/nca/baseconfig/NCAMaterielControl', services.NCAMaterielControlSRV.NCAMaterielControlResource);
app.post('/api/nca/baseconfig/NCASupplierControl', services.NCASupplierControlSRV.NCASupplierControlResource);
app.post('/api/nca/baseconfig/NCASupplierMaterielControl', services.NCASupplierMaterielControlSRV.NCASupplierMaterielControlResource);
app.post('/api/nca/baseconfig/NCALandAgentControl', services.NCALandAgentControlSRV.NCALandAgentControlResource);
app.post('/api/nca/baseconfig/NCAForemanControl', services.NCAForemanControlSRV.NCAForemanControlResource);
app.post('/api/nca/baseconfig/NCAProduceControl', services.NCAProduceControlSRV.NCAProduceControlResource);
app.post('/api/nca/baseconfig/NCAProductPlanControl', services.NCAProductPlanControlSRV.NCAProductPlanControlResource);
app.post('/api/nca/baseconfig/NCAProductProcedureControl', services.NCAProductProcedureControlSRV.NCAProductionProcedureControlResource);
app.post('/api/nca/baseconfig/NCAMaterielSyncControl', services.NCAMaterielSyncControlSRV.NCAMaterielSyncControlResource);
app.post('/api/nca/baseconfig/NCATaskListControl', services.NCATaskListControlSRV.NCATaskListControlResource);
app.post('/api/nca/baseconfig/NCATaskAllotControl', services.NCATaskAllotControlSRV.NCATaskAllotControlResource);
app.post('/api/nca/baseconfig/NCASiteConfigCaseControl', services.NCASiteConfigCaseControl.NCASiteConfigCaseControl);
app.post('/api/nca/baseconfig/NCASiteSearchCaseControl', services.NCASiteSearchCaseControl.NCASiteSearchCaseControl);
app.post('/api/nca/baseconfig/NCASiteConfigDiaryControl', services.NCASiteConfigDiaryControl.NCASiteConfigDiaryControl);
app.post('/api/nca/baseconfig/NCASiteSearchDiaryControl', services.NCASiteSearchDiaryControl.NCASiteSearchDiaryControl);
app.post('/api/nca/baseconfig/NCAWorkerControl', services.NCAWorkerControlSRV.NCAWorkerControlResource);
app.post('/api/nca/baseconfig/NCAProjectControl', services.NCAProjectControlSRV.NCAProjectControlResource);
app.post('/api/nca/baseconfig/NCAFinalAccountControl', services.NCAFinalAccountControlSRV.NCAFinalAccountControlResource);
app.post('/api/nca/baseconfig/NCAWorkerPriceControl', services.NCAWorkerPriceControlSRV.NCAWorkerPriceControlResource);
app.post('/api/nca/baseconfig/NCANoticeControl', services.NCANoticeControlSRV.NCANoticeControlResource);
app.post('/api/nca/baseconfig/NCAHumanResourceControl', services.NCAHumanResourceControlSRV.NCAHumanResourceControlResource);
app.post('/api/nca/baseconfig/NCAEmployeeInformationControl', services.NCAEmployeeInformationControlSRV.NCAEmployeeInformationControlResource);
app.post('/api/nca/baseconfig/NCAAffiliatedCompanyControl', services.NCAAffiliatedCompanyControlSRV.NCAAffiliatedCompanyControlSRVResource);
app.post('/api/nca/baseconfig/NCABusinessCustomerControl', services.NCABusinessCustomerControlSRV.NCABusinessCustomerControlSRVResource);
app.post('/api/nca/baseconfig/NCASmallProgramControl', services.NCASmallProgramSRV.SmallProgramResource);
app.post('/api/nca/baseconfig/NCASmallProgramControl', services.NCASmallProgramSRV.SmallProgramResource);
app.post('/api/nca/baseconfig/NCAMeetingRoomManageControl', services.NCAMeetingRoomManageControlSRV.NCAMeetingRoomManageControlResource);
app.post('/api/nca/baseconfig/NCAVehicleManageControl', services.NCAVehicleManageControlSRV.NCAVehicleManageControlResource);
app.post('/api/nca/baseconfig/NCAReimburseRankControl', services.NCAReimburseRankSRV.NCAReimburseRankResource);
app.post('/api/nca/baseconfig/NCABaseDataControl', services.NCABaseDataControlSRV.NCABaseDataControlResource);
app.post('/api/nca/baseconfig/NCAMeetingManageControl', services.NCAMeetingManageControlSRV.NCAMeetingManageControlResource);
app.post('/api/nca/baseconfig/NCAMeetingMinuteControl', services.NCAMeetingMinuteControlSRV.NCAMeetingMinuteControlResource);
app.post('/api/nca/baseconfig/NCATransReceptionListControl', services.NCATransReceptionSRV.NCATransReceptionResource);
app.post('/api/nca/baseconfig/NCATransReceptionDetailControl', services.NCATransReceptionDetailSRV.NCATransReceptionDetailResource);
app.post('/api/nca/baseconfig/NCAAskForLeaveControl', services.NCAAskForLeaveControlSRV.NCAAskForLeaveControlResource);
app.post('/api/nca/baseconfig/NCATransReceptionExpenseControl', services.NCATransReceptionExpenseSRV.NCATransReceptionExpenseResource);
app.post('/api/nca/baseconfig/NCATransReceptionExpenseDetailControl', services.NCATransReceptionExpenseDetailSRV.NCATransReceptionExpenseDetailResource);
app.post('/api/nca/baseconfig/NCACms', services.NCACmsSRV.NCACmsResource);
app.get('/api/nca/baseconfig/NCACmsFile', services.NCACmsFileSRV.NCACmsFileResource);
app.post('/api/nca/baseconfig/NCADocumentManagementControl', services.NCADocumentManagementControlSRV.NCADocumentManagementControlResource);
app.post('/api/nca/baseconfig/NCADocumentNoticeControl', services.NCADocumentNoticeControlSRV.NCADocumentNoticeControlResource);
app.post('/api/nca/baseconfig/NCASpecialExpenseControl', services.NCASpecialExpenseControl.NCASpecialExpenseSRV);
app.post('/api/nca/baseconfig/NCACorporateClientsControl', services.NCACorporateClientsControlSRV.NCACorporateClientsControlResource);
app.post('/api/nca/baseconfig/NCAPointControl', services.NCAPointControlSRV.NCAPointControlResource);
app.post('/api/nca/baseconfig/NCADepartmentControl', services.NCADepartmentControlSRV.NCADepartmentControlResource);
app.post('/api/nca/baseconfig/NCAUsergroupControl', services.NCAUsergroupControlSRV.NCAUsergroupControlResource);
app.post('/api/nca/baseconfig/UserDepartmentControl', services.UserDepartmentSRV.UserDepartmentSRVResource);
app.post('/api/nca/baseconfig/UserGroupControl', services.UserGroupSRV.UserGroupSRVResource);
app.post('/api/nca/baseconfig/UserDepartmentGroupControl', services.UserDepartmentGroupControlSRV.UserDepartmentGroupControlResource);
app.post('/api/nca/baseconfig/NCAEmployeeUserGroupControl', services.NCAEmployeeUserGroupControlSRV.NCAEmployeeUserGroupControlResource);
app.post('/api/nca/baseconfig/NCAProductSalesPriceControl', services.NCAProductSalesPriceControlSRV.NCAProductSalesPriceControlResource);
app.post('/api/nca/baseconfig/NCASystemDataInitializationControl', services.NCASystemDataInitializationControlSRV.NCASystemDataInitializationControlResource);
app.post('/api/nca/baseconfig/NCAMessageListControl', services.NCAMessageListControlSRV.NCAMessageListControlResource);
app.post('/api/nca/baseconfig/NCAPointTypeControl', services.NCAPointTypeControlSRV.NCAPointTypeControlResource);

// purchasemanage
app.post('/api/nca/purchasemanage/NCAPurchaseControl', services.NCAPurchaseControlSRV.NCAPurchaseControlResource);
app.post('/api/nca/purchasemanage/NCAPurchaseListControl', services.NCAPurchaseControlSRV.NCAPurchaseControlResource);
app.post('/api/nca/purchasemanage/NCAPurchaseDetailControl', services.NCAPurchaseDetailControlSRV.NCAPurchaseDetailControlResource);
app.post('/api/nca/purchasemanage/NCAPurchaseApplyDetailControl', services.NCAPurchaseApplyDetailControlSRV.NCAPurchaseApplyDetailControlResource);
app.post('/api/nca/purchasemanage/NCAQualityAddControl', services.NCAQualityAddControlSRV.NCAQualityAddControlResource);
app.post('/api/nca/purchasemanage/NCAQualityCheckControl', services.NCAQualityCheckControlSRV.NCAQualityCheckControlResource);
app.post('/api/nca/purchasemanage/NCAReturnNoteControl', services.NCAReturnNoteControlSRV.NCAReturnNoteControlResource);

// inventorymanage
app.post('/api/nca/inventorymanage/NCABuyInControl', services.NCABuyInControlSRV.NCABuyInControlResource);
app.post('/api/nca/inventorymanage/NCASaleOutControl', services.NCASaleOutControlSRV.NCASaleOutControlResource);
app.post('/api/nca/inventorymanage/NCACheckInventoryControl', services.NCACheckInventoryControlSRV.NCACheckInventoryControlResource);
app.post('/api/nca/inventorymanage/NCAInventoryControl', services.NCAInventoryControlSRV.NCAInventoryControlResource);
app.post('/api/nca/inventorymanage/NCAInventoryDetailControl', services.NCAInventoryDetailControlSRV.NCAInventoryDetailControlResource);
app.post('/api/nca/inventorymanage/NCAWarehouseControl', services.NCAWarehouseControlSRV.NCAWarehouseControlResource);
app.post('/api/nca/inventorymanage/NCAInvalidateControl', services.NCAInvalidateControlSRV.NCAInvalidateControlResource);
app.post('/api/nca/inventorymanage/NCAInvalidateApplyControl', services.NCAInvalidateControlSRV.NCAInvalidateControlResource);
app.post('/api/nca/inventorymanage/NCAStcokInApplyControl', services.NCAStcokInApplyControlSRV.NCAStcokInApplyControlResource);
app.post('/api/nca/inventorymanage/NCAStockOutApplyControl', services.NCAStcokOutApplyControlSRV.NCAStcokOutApplyControlResource);
app.post('/api/nca/inventorymanage/NCAIdleApplyControl', services.NCAIdleApplyControlSRV.NCAIdleApplyControlResource);
app.post('/api/nca/inventorymanage/NCACollectGoodsControl', services.NCACollectGoodsControlSRV.NCACollectGoodsControlResource);
app.post('/api/nca/inventorymanage/NCAReceiptListControl', services.NCAReceiptListControlSRV.NCAReceiptListControlResource);

//homepage
app.post('/api/nca/homepage/NCAHomePageControl', services.NCAHomePageControlSRV.NCAHomePageControlResource);

//productionmanage
app.post('/api/nca/productionmanage/NCAMasterPlanControl', services.NCAMasterPlanControlSRV.NCAMasterPlanControlResource);
app.post('/api/nca/productionmanage/NCAWeeklyPlanControl', services.NCAWeeklyPlanControlSRV.NCAWeeklyPlanControlResource);
app.post('/api/nca/productionmanage/NCADailyPlanControl', services.NCADailyPlanControlSRV.NCADailyPlanControlResource);
app.post('/api/nca/productionmanage/NCAProductiveTaskControl', services.NCAProductiveTaskControlSRV.NCAProductiveTaskControlResource);

// mobile
app.post('/api/mobile/appointment', services.MBAppointmentSRV.MBAppointmentResource);
app.post('/api/mobile/quote', services.MBSmartQuoteSRV.MBSmartQuoteResource);
app.post('/api/mobile/node', services.MBNodeSRV.MBNodeResource);
app.post('/api/mobile/order', services.MBOrderSRV.MBOrderResource);
app.post('/api/mobile/user', services.MBUserSRV.MBUserResource);
app.post('/api/mobile/crew', services.MBCrewSRV.MBCrewResource);
app.post('/api/mobile/customer', services.MBCustomerSRV.MBCustomerResource);
app.post('/api/mobile/inquiry', services.MBInquirySRV.MBInquiryResource);
app.post('/api/mobile/feedback', services.MBFeedbackSRV.MBFeedbackResource);
app.post('/api/mobile/materiel', services.MBMaterielSRV.MBMaterielResource);
app.post('/api/mobile/design', services.MBDesignSRV.MBDesignResource);
app.post('/api/mobile/guest', services.MBGuestSRV.MBGuestResource);
app.post('/api/mobile/task', services.MBTaskSRV.NCATaskListControlResource);
app.post('/api/mobile/complaint', services.MBComplaintSRV.NCAComplaintControlResource);

//微信小程序
app.post('/api/mobile/wechat', services.MBWechatSRV.WechatResource);

//openApi
app.post('/api/openapi/zowee', services.ZoweeSRV.ZoweeControlResource);
app.post('/api/openapi/kujiale', services.KujialeSRV.KujialeControlResource);
app.get('/api/openapi/kujiale', services.KujialeSRV.KujialeGetControlResource);
app.post('/api/openapi/signpdf', services.SignPDFSRV.SignPDFControlResource);
app.post('/api/openapi/shop', services.shopSRV.ShopControlResource);

// longtermassets
app.post('/api/nca/longtermassets/NCAFixedAssetsControl', services.NCAFixedAssetsControlSRV.NCAFixedAssetsControlResource);
app.post('/api/nca/longtermassets/NCAAmortizeControl', services.NCAAmortizeControlSRV.NCAAmortizeControlResource);
app.post('/api/nca/longtermassets/NCAAmortizeDataControl', services.NCAAmortizeDataControlSRV.NCAAmortizeDataControlResource);
app.post('/api/nca/longtermassets/NCAAmortizeDetailControl', services.NCAAmortizeDetailControlSRV.NCAAmortizeDetailControlResource);
app.post('/api/nca/longtermassets/NCAAmortizeReceiveControl', services.NCAAmortizeReceiveControlSRV.NCAAmortizeReceiveControlResource);
app.post('/api/nca/longtermassets/NCAConsumablesControlSRV', services.NCAConsumablesControlSRV.NCAConsumablesControlResource);
app.post('/api/nca/longtermassets/NCAConsumablesDetailControlSRV', services.NCAConsumablesDetailControlSRV.NCAConsumablesDetailControlResource);
app.post('/api/nca/longtermassets/NCAAssetRetirementControl', services.NCAAssetRetirementControlSRV.NCAAssetRetirementControlResource);
app.post('/api/nca/longtermassets/NCATakeStockSRV', services.NCATakeStockSRV.NCATakeStockResource);
app.post('/api/nca/longtermassets/NCAAmortizeConsumeControl', services.NCAAmortizeConsumeControlSRV.NCAAmortizeConsumeControlResource);
app.post('/api/nca/longtermassets/NCAAmortizeScribeOrderControl', services.NCAAmortizeScribeOrderControlSRV.NCAAmortizeScribeOrderControlResource);
app.post('/api/nca/longtermassets/NCAAmortizePurchaseOrderControl', services.NCAAmortizePurchaseOrderControlSRV.NCAAmortizePurchaseOrderControlResource);

app.post('/api/nca/longtermassets/NCADevelopControl', services.NCADevelopControlSRV.NCADevelopControlResource);
app.post('/api/nca/longtermassets/NCADevelopDetailControl', services.NCADevelopDetailControlSRV.NCADevelopDetailControlResource);
app.post('/api/nca/longtermassets/NCADevelopScribeOrderControl', services.NCADevelopScribeOrderControlSRV.NCADevelopScribeOrderControlResource);
app.post('/api/nca/longtermassets/NCADevelopPurchaseOrderControl', services.NCADevelopPurchaseOrderControlSRV.NCADevelopPurchaseOrderControlResource);
app.post('/api/nca/longtermassets/NCADevelopReceiveControl', services.NCADevelopReceiveControlSRV.NCADevelopReceiveControlResource);
app.post('/api/nca/longtermassets/NCADevelopConsumeControl', services.NCADevelopConsumeControlSRV.NCADevelopConsumeControlResource);
// cashiermanage
app.post('/api/nca/cashiermanage/NCAGatheringControl', services.NCAGatheringControlSRV.NCAGatheringControlResource);
app.post('/api/nca/cashiermanage/NCAPaymentConfirmControl', services.NCAPaymentConfirmControlSRV.NCAPaymentConfirmControlResource);

//site
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'test') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        })
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

module.exports = app;
