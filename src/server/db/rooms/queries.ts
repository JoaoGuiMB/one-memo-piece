import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { rooms } from "~/server/db/schema";

export type CreateRoom = {
  name: string;
};

export const findRoomByName = async (name: string) => {
  return await db
    .selectDistinct({ id: rooms.id, name: rooms.name, status: rooms.status })
    .from(rooms)
    .where(eq(rooms.name, name));
};

export const createRoom = async (input: CreateRoom) => {
  const { name } = input;
  const id = createId();
  const room = await db
    .insert(rooms)
    .values({ name, id })
    .returning({ id: rooms.id });
  return room;
};
