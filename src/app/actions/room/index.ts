"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { createRoom, findRoomByName } from "~/server/db/rooms/queries";
import { roomUsers } from "~/server/db/schema";
import { redirect } from "next/navigation";

export const joinRoomAction = async (formData: FormData) => {
  const name = formData.get("roomName") as string;
  const user = await currentUser();
  if (!user) return;

  const foundRoom = await findRoomByName(name);
  let roomId = "";
  if (!foundRoom[0]?.id) {
    const room = await createRoom({ name, ownerId: user.id });
    if (!room[0]) return;
    roomId = room[0]?.id;
  } else {
    roomId = foundRoom[0]?.id;
  }

  await db.insert(roomUsers).values({ roomId, userId: user.id });
  redirect(`/rooms/${name}`);
};
