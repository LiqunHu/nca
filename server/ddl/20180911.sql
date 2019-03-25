SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

/*
  your backup sql
*/

/* jjs */

ALTER TABLE `tbl_nca_productivetask` ADD COLUMN `stock_in_number` bigint(20) DEFAULT 0 AFTER `updated_at`;
ALTER TABLE `tbl_nca_productivetask` ADD COLUMN `stock_in_state` varchar(4) DEFAULT '1' AFTER `stock_in_number`;
ALTER TABLE `tbl_nca_productivetaskrelated` ADD COLUMN `related_stock_in_number` bigint(20) DEFAULT 0 AFTER `updated_at`;

/*end jjs */