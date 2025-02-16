"use server";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "~/server/db";
import {
  createRoom,
  findRoomByName,
  findRoomByOwner,
} from "~/server/db/rooms/queries";
import { roomUsers } from "~/server/db/schema";
import { redirect } from "next/navigation";
import { insertGameCards } from "~/server/db/cards/queries";

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

export const checkIfUserHasRoom = async () => {
  const user = await currentUser();
  if (!user) return;

  const foundRoom = await findRoomByOwner(user.id);
  if (foundRoom[0]?.id) {
    redirect(`/rooms/${foundRoom[0]?.name}`);
  }

  return false;
};

export const startGame = async (roomName: string) => {
  return await insertGameCards(roomName);
};
