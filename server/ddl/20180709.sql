SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* jjs */
    DROP TABLE IF EXISTS `tbl_nca_receivablesrule`;
    CREATE TABLE IF NOT EXISTS `tbl_nca_receivablesrule` (
    `receivablesrule_id` BIGINT NOT NULL auto_increment,
    `receivables_rule_name` VARCHAR(30) NOT NULL,
    `receivables_rule_rate` DOUBLE PRECISION NOT NULL,
    `domain_id` BIGINT NOT NULL,
    `state` VARCHAR(5) DEFAULT '1',
    `version` BIGINT NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`receivablesrule_id`)
    );

    call Pro_AddMenu('订单管理', '收款规则设置', '/nca/ordermanage/NCAReceivablesRuleControl','NCARECEIVABLESRULECONTROL');
/*end jjs */


/* ty */
ALTER TABLE `tbl_nca_suppliermateriel`
ADD COLUMN `suppliermateriel_priceeffective` varchar(4) AFTER `suppliermateriel_expirydate`;
/*end ty */

/* hlq */
DROP TABLE IF EXISTS `tbl_common_userlog`;
CREATE TABLE `tbl_common_userlog` (
  `userlog_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `api_function` varchar(100) NOT NULL,
  `userlog_method` varchar(50) NOT NULL,
  `userlog_para` text NOT NULL,
  `state` varchar(5) DEFAULT '1',
  `version` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`userlog_id`)
);
/* end hlq */