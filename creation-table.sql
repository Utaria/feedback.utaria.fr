CREATE TABLE `feedbacks` (
	`id`          INT(11) NOT NULL AUTO_INCREMENT,
	`playername`  VARCHAR(100) NOT NULL,
	`service`     VARCHAR(255) NOT NULL,
	`description` TEXT NULL,
	`priority`    INT(1) NOT NULL DEFAULT '0',
	`date`        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (`id`)
); 