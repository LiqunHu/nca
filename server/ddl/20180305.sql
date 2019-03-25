SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* ty */
ALTER TABLE tbl_nca_workerprice modify worker_cost double NUll DEFAULT '0';
/*end ty */
