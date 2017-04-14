ALTER TABLE `jus_shop_products` ADD `pr_actual_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `pr_last_modified`;
ALTER TABLE `jus_shop_products` ADD `pr_isnew` TINYINT NOT NULL DEFAULT '0' AFTER `pr_actual_date`;
ALTER TABLE `jus_shop_customers` ADD `cst_vk` VARCHAR(255) NULL AFTER `cst_passwd`;
ALTER TABLE `jus_shop_positions` CHANGE `pst_pr_variant` `pst_pr_variant` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `jus_shop_positions` CHANGE `pst_comment` `pst_comment` INT(11) NULL;
ALTER TABLE `jus_shop_positions` CHANGE `pst_stt_id` `pst_stt_id` INT(11) NULL DEFAULT NULL;
ALTER TABLE `jus_shop_positions` CHANGE `pst_timestamp` `pst_timestamp` TIMESTAMP on update CURRENT_TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `jus_shop_customers` ADD `cst_temp_hash` VARCHAR(255) NULL AFTER `cst_vk`;
ALTER TABLE `jus_shop_orders` ADD `ord_summ` DECIMAL NULL AFTER `ord_date`;
ALTER TABLE `jus_shop_orders` ADD `ord_payment_id` INT NULL AFTER `ord_summ`;


CREATE TABLE `jus_shop_payments` (
  `pay_id` int(11) NOT NULL,
  `pay_summ` decimal(15,4) DEFAULT NULL,
  `pay_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pay_method_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `jus_shop_payments` ADD KEY `pay_id` (`pay_id`);
ALTER TABLE `jus_shop_payments` MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE `jus_shop_payment_method` (
  `spm_id` int(11) NOT NULL,
  `spm_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `jus_shop_payment_method` ADD PRIMARY KEY (`spm_id`);
ALTER TABLE `jus_shop_payment_method` MODIFY `spm_id` int(11) NOT NULL AUTO_INCREMENT;