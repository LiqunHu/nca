SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* nie */
/*ALTER TABLE `tbl_nca_purchaseapply`
ADD COLUMN `description` VARCHAR(100) AFTER `approval_date`;*/
/*end nie */
/* ty */
ALTER TABLE tbl_nca_reviewmateriel modify review_materiel_cost INTEGER NUll DEFAULT '0';
ALTER TABLE tbl_nca_reviewmateriel modify review_materiel_sale INTEGER NUll DEFAULT '0';
/*end ty */

/* hlq */
/*ALTER TABLE `tbl_nca_receivables`
CHANGE COLUMN `receivables_operator` `receivables_operator_id` varchar(30) DEFAULT NULL ;*/
/*end hlq */

/* LJZ */
ALTER TABLE tbl_nca_supplier modify supplier_proportion INTEGER NUll DEFAULT '0';
ALTER TABLE tbl_nca_suppliermateriel modify suppliermateriel_tax INTEGER NUll DEFAULT '0';
/*end LJZ */

/* ty */
ALTER TABLE tbl_nca_reviewmateriel modify review_materiel_loss INTEGER NUll DEFAULT '0';
ALTER TABLE tbl_nca_reviewmateriel modify review_materiel_tax INTEGER NUll DEFAULT '0';
ALTER TABLE tbl_nca_materiel modify materiel_tax INTEGER NUll DEFAULT '0';
ALTER TABLE tbl_nca_materiel modify materiel_loss INTEGER NUll DEFAULT '0';
/*end ty */