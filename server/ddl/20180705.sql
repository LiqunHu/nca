SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* ty */
ALTER TABLE `tbl_nca_transreceptionapply`
ADD COLUMN `trapply_traffic_tools` VARCHAR(10) NULL AFTER `trapply_vehicle_remark`;
/*end ty */


/* lwt */
update tbl_common_api set api_name = '产品列表' where api_function = 'NCAPRODUCECONTROL';
update tbl_common_domainmenu set domainmenu_name = '产品列表' where api_function = 'NCAPRODUCECONTROL';
update tbl_common_systemmenu set systemmenu_name = '产品列表' where api_function = 'NCAPRODUCECONTROL';
update tbl_common_templatemenu set templatemenu_name = '产品列表' where api_function = 'NCAPRODUCECONTROL';

update tbl_common_api set api_name = '物料列表' where api_function = 'NCAMATERIELCONTROL';
update tbl_common_domainmenu set domainmenu_name = '物料列表' where api_function = 'NCAMATERIELCONTROL';
update tbl_common_systemmenu set systemmenu_name = '物料列表' where api_function = 'NCAMATERIELCONTROL';
update tbl_common_templatemenu set templatemenu_name = '物料列表' where api_function = 'NCAMATERIELCONTROL';
/* end lwt */

/* wj */
ALTER TABLE `tbl_nca_vehicle`
ADD COLUMN `vehicle_status_flag` varchar(30) DEFAULT 0 AFTER `vehicle_status`;
/* wj */
