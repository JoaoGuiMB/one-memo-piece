import { findGameCards } from "../db/cards/queries";
import { findRoomByName } from "../db/rooms/queries";

export const getRoomInfoUseCase = async (roomName: string) => {
  const foundRoom = await findRoomByName(roomName);
  if (!foundRoom[0]?.id) {
    throw new Error("Room not found");
  }
  const foundCards = (await findGameCards(roomName)) ?? [];

  return {
    id: foundRoom[0].id,
    name: foundRoom[0].name,
    ownerId: foundRoom[0].ownerId,
    cards: foundCards,
  };
};
