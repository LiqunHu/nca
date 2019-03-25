SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* jjs */

insert into tbl_nca_taskallot(taskallot_id , taskallot_name , taskallot_describe, created_at, updated_at)
    	values(58 , '品质检验任务' , '分配物料质检人员', now(), now());

ALTER TABLE `tbl_nca_receipt` ADD COLUMN `check_state` varchar(4) DEFAULT '0' AFTER `updated_at`;
ALTER TABLE `tbl_nca_receiptitem` ADD COLUMN `qualified_number` int(11) DEFAULT 0 AFTER `updated_at`;

/*end jjs */

/* ty */

ALTER TABLE `tbl_nca_reviewmateriel`
ADD COLUMN `review_materiel_state_management` varchar(4) AFTER `review_materiel_intpart`;

ALTER TABLE `tbl_nca_materiel`
ADD COLUMN `materiel_state_management` varchar(4) AFTER `materiel_intpart`;

ALTER TABLE `tbl_nca_task`
ADD COLUMN `end_time` datetime AFTER `task_group`;

call Pro_AddMenu('订单管理', '机构订单','/nca/ordermanage/NCASaleOrderInstitutionsControl','NCASALEORDERINSTITUTIONSCONTROL');
call Pro_AddMenu('订单管理', '个人订单','/nca/ordermanage/NCASaleOrderControl','NCASALEORDERCONTROL');
call Pro_AddMenu('订单管理', '企业订单','/nca/ordermanage/NCASaleOrderCompanyControl','NCASALEORDERCOMPANYCONTROL');

update tbl_common_api set api_name = '装修订单' where api_function = 'NCAORDERCONTROL';
update tbl_common_domainmenu set domainmenu_name = '装修订单' where api_function = 'NCAORDERCONTROL';
update tbl_common_systemmenu set systemmenu_name = '装修订单' where api_function = 'NCAORDERCONTROL';
update tbl_common_templatemenu set templatemenu_name = '装修订单' where api_function = 'NCAORDERCONTROL';
/*end ty */

/* hlq */
ALTER TABLE `tbl_nca_task` ADD COLUMN `taskallotuser_level` int(11) DEFAULT 0 AFTER `task_group`;
/* end hlq */