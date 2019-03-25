SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* njc */
delete from tbl_common_systemmenu where systemmenu_name like '%研发%';
delete from tbl_common_api where api_name like '%研发%';
delete from tbl_common_domainmenu where domainmenu_name like '%研发%';

insert into tbl_common_systemmenu (systemmenu_name,node_type,parent_id,version,created_at,updated_at) VALUES ('研发资产管理','00','16',1,NOW(),NOW());
call Pro_AddMenu('研发资产管理', '研发项目管理','/nca/longtermassets/NCADevelopControl','NCADEVELOPCONTROL');
call Pro_AddMenu('研发资产管理', '研发项目管理明细','/nca/longtermassets/NCADevelopDetailControl','NCADEVELOPDETAILCONTROL');
call Pro_AddMenu('研发资产管理', '材料申购单', '/nca/longtermassets/NCADevelopScribeOrderControl', 'NCADEVELOPSCRIBEORDERCONTROL');
call Pro_AddMenu('研发资产管理', '材料采购单', '/nca/longtermassets/NCADevelopPurchaseOrderControl', 'NCADEVELOPPURCHASECONTROL');
call Pro_AddMenu('研发资产管理', '材料收料单', '/nca/longtermassets/NCADevelopReceiveControl', 'NCADEVELOPRECEIVECONTROL');
call Pro_AddMenu('研发资产管理', '材料耗用单', '/nca/longtermassets/NCADevelopConsumeControl', 'NCADEVELOPCONSUMECONTROL');
update tbl_common_api set show_flag = 0 where api_name like '%研发项目管理明细%';

/*end njc */