CREATE DATABASE IF NOT EXISTS `solarschiff`
USE `solarschiff`;

CREATE TABLE `Highscore` (
	`Id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`LastName` VARCHAR(30) NULL,
	`FirstName` VARCHAR(30) NULL,
	`DisplayName` VARCHAR(30) NOT NULL COMMENT 'name shown in highscore list',
	`Email` VARCHAR(60) NOT NULL,
	`Score` INT UNSIGNED NOT NULL,
	`ConfirmationStatus` TINYINT UNSIGNED NULL,
	PRIMARY KEY (`Id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
