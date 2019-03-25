SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* ls */

ALTER TABLE `tbl_nca_produce_client`
ADD COLUMN `materiel_id` bigint(20) AFTER `produce_id`;

update tbl_nca_produce_client
set materiel_id = (select p.materiel_id from tbl_nca_produce p
where tbl_nca_produce_client.produce_id=p.produce_id and p.domain_id = tbl_nca_produce_client.client_domain_id);

/*end ls */