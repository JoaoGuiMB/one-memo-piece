import { createGameCards } from "~/app/rooms/[roomName]/lib/generateCards";
import { findRoomByName } from "../rooms/queries";
import { cards } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";

export const insertGameCards = async (roomName: string) => {
  const foundRoom = await findRoomByName(roomName);
  if (!foundRoom[0]?.id) return;

  const generatedCards = createGameCards(foundRoom[0]?.id);
  for (const card of generatedCards) {
    await db.insert(cards).values({
      roomId: card.roomId,
      id: card.id,
      imageUrl: card.imageUrl,
      isMatched: card.isMatched,
      flippedBy: card.flippedBy,
    });
  }
};

export const findGameCards = async (roomName: string) => {
  const foundRoom = await findRoomByName(roomName);
  if (!foundRoom[0]?.id) return;

  return (
    (await db
      .selectDistinct({
        id: cards.id,
        roomId: cards.roomId,
        imageUrl: cards.imageUrl,
        isMatched: cards.isMatched,
        flippedBy: cards.flippedBy,
      })
      .from(cards)
      .where(eq(cards.roomId, foundRoom[0].id))) ?? []
  );
};
