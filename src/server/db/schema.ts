import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

// Rooms Table
export const rooms = sqliteTable("rooms", {
  id: text("id").primaryKey(), // Turso uses text for UUIDs
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(current_timestamp)`,
  ),
  status: text("status").default("waiting"),
  ownerId: text("owner_id").notNull(), // Clerk's userId
});

// Room Users Table
export const roomUsers = sqliteTable(
  "room_users",
  {
    roomId: text("room_id")
      .notNull()
      .references(() => rooms.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(), // Clerk's userId
    matchedCards: integer("matched_cards").default(0),
    joinedAt: integer("joined_at", { mode: "timestamp" }).default(
      sql`(current_timestamp)`,
    ),
  },
  (table) => [primaryKey({ columns: [table.roomId, table.userId] })],
);

// Cards Table
export const cards = sqliteTable("cards", {
  id: text("id").primaryKey(), // Turso uses text for UUIDs
  roomId: text("room_id")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  isMatched: integer("is_matched", { mode: "boolean" })
    .default(false)
    .notNull(),
  flippedBy: text("flipped_by"), // Clerk's userId
});
