SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


/*
  your backup sql
*/

/* ty */
ALTER TABLE `tbl_nca_docdetailquestion` ADD COLUMN `submit_question_answer` varchar(4) AFTER `question_answer`;
call Pro_AddMenu('行政办公管理', '文件通知', '/nca/baseconfig/NCADocumentNoticeControl', 'NCADOCUMENTNOTICECONTROL');
/*end ty */
/* njc */
--    call Pro_AddMenu('运营数据管理', '内容分类管理', '/nca/baseconfig/NCAContentManageTypeControl', 'NCACONTENTMANAGETYPECONTROL');
    call Pro_AddMenu('运营数据管理', '内容信息管理', '/nca/baseconfig/NCAContentManageControl', 'NCACONTENTMANAGECONTROL');
/*end njc */
