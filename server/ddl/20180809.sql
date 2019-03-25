SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* ty */
update tbl_common_api set api_name = '系统数据字典初始化' where api_function = 'NCASYSTEMDATAINITIALIZATIONCONTROL';
update tbl_common_domainmenu set domainmenu_name = '系统数据字典初始化' where api_function = 'NCASYSTEMDATAINITIALIZATIONCONTROL';
update tbl_common_systemmenu set systemmenu_name = '系统数据字典初始化' where api_function = 'NCASYSTEMDATAINITIALIZATIONCONTROL';
update tbl_common_templatemenu set templatemenu_name = '系统数据字典初始化' where api_function = 'NCASYSTEMDATAINITIALIZATIONCONTROL';

alter table tbl_nca_produce_client modify column produce_id bigint(20);
/*end ty */
/* qm */

ALTER TABLE `ncadata`.`tbl_nca_orderrequire` CHANGE COLUMN `require_user_id` `require_user_id` varchar(30);

/*end qm */