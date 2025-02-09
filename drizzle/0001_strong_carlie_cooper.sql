ALTER TABLE `room_users` ALTER COLUMN "joined_at" TO "joined_at" integer DEFAULT (current_timestamp);--> statement-breakpoint
ALTER TABLE `rooms` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT (current_timestamp);--> statement-breakpoint
ALTER TABLE `rooms` ADD `owner_id` text NOT NULL;