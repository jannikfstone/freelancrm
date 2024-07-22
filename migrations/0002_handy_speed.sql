CREATE TABLE `interactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`company_id` integer NOT NULL,
	`date` text NOT NULL,
	`notes` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE no action
);
