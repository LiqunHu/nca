SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* ls */
    INSERT INTO tbl_nca_taskallot(taskallot_id , taskallot_name , taskallot_describe, created_at, updated_at)
        VALUES(23 , '会议通知' , '通知会议室设备管理员', now(), now());

    ALTER TABLE `tbl_nca_meeting` ADD COLUMN `equipmentuser_id` varchar(30) NUll AFTER `meetinguser_id`;

/*end ls */
