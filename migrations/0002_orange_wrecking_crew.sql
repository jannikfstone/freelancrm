CREATE TABLE `contacts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
