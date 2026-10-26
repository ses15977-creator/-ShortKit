CREATE TABLE `shared_ai_usage` (
	`day` text NOT NULL,
	`visitor` text NOT NULL,
	`used` integer NOT NULL,
	PRIMARY KEY(`day`, `visitor`)
);
