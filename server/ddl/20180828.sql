SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

/*
  your backup sql
*/


/* ty */

update tbl_common_api set api_name = '物料数据维护' where api_function = 'NCAMATERIELCONTROL';
update tbl_common_domainmenu set domainmenu_name = '物料数据维护' where api_function = 'NCAMATERIELCONTROL';
update tbl_common_systemmenu set systemmenu_name = '物料数据维护' where api_function = 'NCAMATERIELCONTROL';
update tbl_common_templatemenu set templatemenu_name = '物料数据维护' where api_function = 'NCAMATERIELCONTROL';

update tbl_common_api set api_name = '收款申请管理' where api_function = 'NCAGATHERINGCONTROL';
update tbl_common_domainmenu set domainmenu_name = '收款申请管理' where api_function = 'NCAGATHERINGCONTROL';
update tbl_common_systemmenu set systemmenu_name = '收款申请管理' where api_function = 'NCAGATHERINGCONTROL';
update tbl_common_templatemenu set templatemenu_name = '收款申请管理' where api_function = 'NCAGATHERINGCONTROL';

update tbl_common_api set api_name = '部门管理' where api_function = 'NCADEPARTMENTCONTROL';
update tbl_common_domainmenu set domainmenu_name = '部门管理' where api_function = 'NCADEPARTMENTCONTROL';
update tbl_common_systemmenu set systemmenu_name = '部门管理' where api_function = 'NCADEPARTMENTCONTROL';
update tbl_common_templatemenu set templatemenu_name = '部门管理' where api_function = 'NCADEPARTMENTCONTROL';

update tbl_common_api set api_name = '岗位管理' where api_function = 'NCAUSERGROUPCONTROL';
update tbl_common_domainmenu set domainmenu_name = '岗位管理' where api_function = 'NCAUSERGROUPCONTROL';
update tbl_common_systemmenu set systemmenu_name = '岗位管理' where api_function = 'NCAUSERGROUPCONTROL';
update tbl_common_templatemenu set templatemenu_name = '岗位管理' where api_function = 'NCAUSERGROUPCONTROL';

update tbl_common_api set api_name = '品质检验单列表' where api_function = 'NCAQUALITYCHECKCONTROL';
update tbl_common_domainmenu set domainmenu_name = '品质检验单列表' where api_function = 'NCAQUALITYCHECKCONTROL';
update tbl_common_systemmenu set systemmenu_name = '品质检验单列表' where api_function = 'NCAQUALITYCHECKCONTROL';
update tbl_common_templatemenu set templatemenu_name = '品质检验单列表' where api_function = 'NCAQUALITYCHECKCONTROL';

update tbl_common_api set api_name = '品质数据录入管理' where api_function = 'NCAQUALITYADDCONTROL';
update tbl_common_domainmenu set domainmenu_name = '品质数据录入管理' where api_function = 'NCAQUALITYADDCONTROL';
update tbl_common_systemmenu set systemmenu_name = '品质数据录入管理' where api_function = 'NCAQUALITYADDCONTROL';
update tbl_common_templatemenu set templatemenu_name = '品质数据录入管理' where api_function = 'NCAQUALITYADDCONTROL';

update tbl_common_api set api_name = '退货单列表' where api_function = 'NCARETURNNOTECONTROL';
update tbl_common_domainmenu set domainmenu_name = '退货单列表' where api_function = 'NCARETURNNOTECONTROL';
update tbl_common_systemmenu set systemmenu_name = '退货单列表' where api_function = 'NCARETURNNOTECONTROL';
update tbl_common_templatemenu set templatemenu_name = '退货单列表' where api_function = 'NCARETURNNOTECONTROL';

update tbl_common_api set api_name = '出差交通接待申请' where api_function = 'NCATRANSRECEPTIONLISTCONTROL';
update tbl_common_domainmenu set domainmenu_name = '出差交通接待申请' where api_function = 'NCATRANSRECEPTIONLISTCONTROL';
update tbl_common_systemmenu set systemmenu_name = '出差交通接待申请' where api_function = 'NCATRANSRECEPTIONLISTCONTROL';
update tbl_common_templatemenu set templatemenu_name = '出差交通接待申请' where api_function = 'NCATRANSRECEPTIONLISTCONTROL';

update tbl_common_api set api_name = '出差交通接待报销申请' where api_function = 'NCATRANSRECEPTIONLISTEXPENSECONTROL';
update tbl_common_domainmenu set domainmenu_name = '出差交通接待报销申请' where api_function = 'NCATRANSRECEPTIONLISTEXPENSECONTROL';
update tbl_common_systemmenu set systemmenu_name = '出差交通接待报销申请' where api_function = 'NCATRANSRECEPTIONLISTEXPENSECONTROL';
update tbl_common_templatemenu set templatemenu_name = '出差交通接待报销申请' where api_function = 'NCATRANSRECEPTIONLISTEXPENSECONTROL';

update tbl_common_api set api_name = '任务管理' where api_function = 'NCATASKLISTCONTROL';
update tbl_common_domainmenu set domainmenu_name = '任务管理' where api_function = 'NCATASKLISTCONTROL';
update tbl_common_systemmenu set systemmenu_name = '任务管理' where api_function = 'NCATASKLISTCONTROL';
update tbl_common_templatemenu set templatemenu_name = '任务管理' where api_function = 'NCATASKLISTCONTROL';

update tbl_common_api set api_name = '生产主计划' where api_function = 'NCAMASTERPLANCONTROL';
update tbl_common_domainmenu set domainmenu_name = '生产主计划' where api_function = 'NCAMASTERPLANCONTROL';
update tbl_common_systemmenu set systemmenu_name = '生产主计划' where api_function = 'NCAMASTERPLANCONTROL';
update tbl_common_templatemenu set templatemenu_name = '生产主计划' where api_function = 'NCAMASTERPLANCONTROL';

update tbl_common_api set api_name = '生产日计划' where api_function = 'NCADAILYPLANCONTROL';
update tbl_common_domainmenu set domainmenu_name = '生产日计划' where api_function = 'NCADAILYPLANCONTROL';
update tbl_common_systemmenu set systemmenu_name = '生产日计划' where api_function = 'NCADAILYPLANCONTROL';
update tbl_common_templatemenu set templatemenu_name = '生产日计划' where api_function = 'NCADAILYPLANCONTROL';

update tbl_common_api set api_name = '生产物料计划' where api_function = 'NCAWEEKLYPLANCONTROL';
update tbl_common_domainmenu set domainmenu_name = '生产物料计划' where api_function = 'NCAWEEKLYPLANCONTROL';
update tbl_common_systemmenu set systemmenu_name = '生产物料计划' where api_function = 'NCAWEEKLYPLANCONTROL';
update tbl_common_templatemenu set templatemenu_name = '生产物料计划' where api_function = 'NCAWEEKLYPLANCONTROL';

update tbl_common_api set api_name = '会议室数据维护' where api_function = 'NCAMEETINGROOMCONTROL';
update tbl_common_domainmenu set domainmenu_name = '会议室数据维护' where api_function = 'NCAMEETINGROOMCONTROL';
update tbl_common_systemmenu set systemmenu_name = '会议室数据维护' where api_function = 'NCAMEETINGROOMCONTROL';
update tbl_common_templatemenu set templatemenu_name = '会议室数据维护' where api_function = 'NCAMEETINGROOMCONTROL';

update tbl_common_api set api_name = '会议记录管理' where api_function = 'NCAMEETINGMINUTECONTROL';
update tbl_common_domainmenu set domainmenu_name = '会议记录管理' where api_function = 'NCAMEETINGMINUTECONTROL';
update tbl_common_systemmenu set systemmenu_name = '会议记录管理' where api_function = 'NCAMEETINGMINUTECONTROL';
update tbl_common_templatemenu set templatemenu_name = '会议记录管理' where api_function = 'NCAMEETINGMINUTECONTROL';

update tbl_common_api set api_name = '出库管理' where api_function = 'NCASALEOUTCONTROL';
update tbl_common_domainmenu set domainmenu_name = '出库管理' where api_function = 'NCASALEOUTCONTROL';
update tbl_common_systemmenu set systemmenu_name = '出库管理' where api_function = 'NCASALEOUTCONTROL';
update tbl_common_templatemenu set templatemenu_name = '出库管理' where api_function = 'NCASALEOUTCONTROL';

update tbl_common_api set api_name = '其他入库申请' where api_function = 'NCASTOCKINAPPLYCONTROL';
update tbl_common_domainmenu set domainmenu_name = '其他入库申请' where api_function = 'NCASTOCKINAPPLYCONTROL';
update tbl_common_systemmenu set systemmenu_name = '其他入库申请' where api_function = 'NCASTOCKINAPPLYCONTROL';
update tbl_common_templatemenu set templatemenu_name = '其他入库申请' where api_function = 'NCASTOCKINAPPLYCONTROL';

update tbl_common_api set api_name = '其他出库申请' where api_function = 'NCASTOCKOUTAPPLYCONTROL';
update tbl_common_domainmenu set domainmenu_name = '其他出库申请' where api_function = 'NCASTOCKOUTAPPLYCONTROL';
update tbl_common_systemmenu set systemmenu_name = '其他出库申请' where api_function = 'NCASTOCKOUTAPPLYCONTROL';
update tbl_common_templatemenu set templatemenu_name = '其他出库申请' where api_function = 'NCASTOCKOUTAPPLYCONTROL';

update tbl_common_api set api_name = '仓库仓区管理' where api_function = 'NCAWAREHOUSECONTROL';
update tbl_common_domainmenu set domainmenu_name = '仓库仓区管理' where api_function = 'NCAWAREHOUSECONTROL';
update tbl_common_systemmenu set systemmenu_name = '仓库仓区管理' where api_function = 'NCAWAREHOUSECONTROL';
update tbl_common_templatemenu set templatemenu_name = '仓库仓区管理' where api_function = 'NCAWAREHOUSECONTROL';

update tbl_common_api set api_name = '实时库存数据管理' where api_function = 'NCAINVENTORYCONTROL';
update tbl_common_domainmenu set domainmenu_name = '实时库存数据管理' where api_function = 'NCAINVENTORYCONTROL';
update tbl_common_systemmenu set systemmenu_name = '实时库存数据管理' where api_function = 'NCAINVENTORYCONTROL';
update tbl_common_templatemenu set templatemenu_name = '实时库存数据管理' where api_function = 'NCAINVENTORYCONTROL';

update tbl_common_api set api_name = '收发存数据管理' where api_function = 'NCAINVENTORYDETAILCONTROL';
update tbl_common_domainmenu set domainmenu_name = '收发存数据管理' where api_function = 'NCAINVENTORYDETAILCONTROL';
update tbl_common_systemmenu set systemmenu_name = '收发存数据管理' where api_function = 'NCAINVENTORYDETAILCONTROL';
update tbl_common_templatemenu set templatemenu_name = '收发存数据管理' where api_function = 'NCAINVENTORYDETAILCONTROL';

update tbl_common_api set api_name = '产品规划列表' where api_function = 'NCAPRODUCTPLANCONTROL';
update tbl_common_domainmenu set domainmenu_name = '产品规划列表' where api_function = 'NCAPRODUCTPLANCONTROL';
update tbl_common_systemmenu set systemmenu_name = '产品规划列表' where api_function = 'NCAPRODUCTPLANCONTROL';
update tbl_common_templatemenu set templatemenu_name = '产品规划列表' where api_function = 'NCAPRODUCTPLANCONTROL';

update tbl_common_api set api_name = '供应商管理' where api_function = 'NCASUPPLIERCONTROL';
update tbl_common_domainmenu set domainmenu_name = '供应商管理' where api_function = 'NCASUPPLIERCONTROL';
update tbl_common_systemmenu set systemmenu_name = '供应商管理' where api_function = 'NCASUPPLIERCONTROL';
update tbl_common_templatemenu set templatemenu_name = '供应商管理' where api_function = 'NCASUPPLIERCONTROL';

update tbl_common_api set api_name = '车辆数据维护' where api_function = 'NCAVEHICLECONTROL';
update tbl_common_domainmenu set domainmenu_name = '车辆数据维护' where api_function = 'NCAVEHICLECONTROL';
update tbl_common_systemmenu set systemmenu_name = '车辆数据维护' where api_function = 'NCAVEHICLECONTROL';
update tbl_common_templatemenu set templatemenu_name = '车辆数据维护' where api_function = 'NCAVEHICLECONTROL';

/*end ty */

/* qm */

ALTER TABLE tbl_nca_productmaterielverify ADD COLUMN verify_type INTEGER NOT NULL;

/*end qm */
