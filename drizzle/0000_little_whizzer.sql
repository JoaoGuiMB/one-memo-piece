CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`image_url` text NOT NULL,
	`is_matched` integer DEFAULT false,
	`flipped_by` text,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `room_users` (
	`room_id` text NOT NULL,
	`user_id` text NOT NULL,
	`matched_cards` integer DEFAULT 0,
	`joined_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	PRIMARY KEY(`room_id`, `user_id`),
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`status` text DEFAULT 'waiting'
);
