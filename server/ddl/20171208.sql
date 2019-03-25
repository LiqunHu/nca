SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* tiny */
/*ALTER TABLE `tbl_nca_stockmap`*/
/*ADD COLUMN `min_purchase_amount` int(11) NULL AFTER `updated_at`;*/
/*ADD COLUMN `trigger_safe_model` varchar(4) AFTER `min_purchase_amount`;*/
/*end tiny */

/* chris */
/*call Pro_AddMenu('nca', '物料采购表', '/nca/purchasemanage/NCAPurchaseListControl', 'NCAPURCHASELISTCONTROL');*/
/*call Pro_AddMenu('nca', '地产商楼盘管理', '/nca/baseconfig/NCALandAgentEstateControl', 'NCALANDAGENTESTATECONTROL');*/
/*call Pro_AddMenu('nca', '地产商订单管理', '/nca/ordermanage/NCALandAgentOrderControl', 'NCALANDAGENTORDERCONTROL');*/
/* chris */

/* nie */
/*DROP TABLE IF EXISTS `tbl_nca_produceacceptance`;
CREATE TABLE `tbl_nca_produceacceptance` (
  `produceacceptance_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `acceptance_index` int(11) NOT NULL,
  `produce_id` bigint(20) NOT NULL,
  `produceprocess_id` bigint(20) NOT NULL,
  `room_type` varchar(20) NOT NULL,
  `acceptance_name` varchar(20) NOT NULL,
  `is_hidden` varchar(2) NOT NULL DEFAULT '0',
  `technological_require` varchar(500) NOT NULL DEFAULT '',
  `evidence_require` varchar(500) NOT NULL DEFAULT '',
  `upload_format` varchar(20) NOT NULL DEFAULT '',
  `state` varchar(5) DEFAULT '1',
  `version` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`produceacceptance_id`)
);*/
/* nie */