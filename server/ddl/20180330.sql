SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* LJZ */
call Pro_AddMenu('客户管理', '企业客户维护', '/nca/baseconfig/NCABusinessCustomerControl', 'NCABUSINESSCUSTOMERCONTROL');
call Pro_AddMenu('运营数据管理', '附属公司管理', '/nca/baseconfig/NCAAffiliatedCompanyControl', 'NCAAFFILIATEDCOMPANYCONTROL');
call Pro_AddMenu('WMS系统管理', '报废管理', '/nca/inventorymanage/NCAInvalidateControl', 'NCAINVALIDATECONTROL');
call Pro_AddMenu('WMS系统管理', '出库申请', '/nca/inventorymanage/NCAStockOutApplyControl', 'NCASTOCKOUTAPPLYCONTROL');
/*end LJZ */


/* LJZ */
ALTER TABLE `tbl_common_domain` ADD COLUMN `updomain_id` int(11) DEFAULT 0 AFTER `domain_description`;
/*end LJZ */

INSERT INTO tbl_common_systemmenu (systemmenu_name,node_type,parent_id,version,created_at,updated_at) VALUES ('项目工程管理','00','16',1,NOW(),NOW());
call Pro_AddMenu('项目工程管理', '项目预算管理', '/nca/baseconfig/NCAProjectControl', 'NCAPROJECTCONTROL');
call Pro_AddMenu('项目工程管理', '项目决算管理', '/nca/baseconfig/NCAFinalAccountControl', 'NCAFINALACCOUNTCONTROL');
call Pro_AddMenu('运营数据管理', '内容管理', '/nca/baseconfig/NCASmallProgramControl', 'NCASMALLPROGRAMCONTROL');




