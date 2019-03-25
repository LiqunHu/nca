SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* ty */
ALTER TABLE `tbl_nca_workerprice`
CHANGE COLUMN `worker_unit` `worker_unit` varchar(100) DEFAULT NULL;

ALTER TABLE tbl_nca_workerprice modify worker_cost INTEGER NUll DEFAULT '0';
/*end ty */