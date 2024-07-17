CREATE TABLE `companies` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`website` text,
	`status` text DEFAULT 'ACTIVE',
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`first_name` text NOT NULL,
	`email` text,
	`phone` text,
	`position` text,
	`companyName` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
