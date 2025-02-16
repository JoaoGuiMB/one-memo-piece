import { createContext, useContext, useState } from "react";
import { type GameCard } from "../lib/generateCards";

export type RoomData = {
  name: string;
  ownerId: string;
  id: string;
  cards: GameCard[];
};

type RoomDetailContextType = {
  roomData: RoomData;
  showCountdown: boolean;
  setShowCountdown: (show: boolean) => void;
};

export const RoomDetailContext = createContext<RoomDetailContextType | null>(
  null,
);

export function RoomDetailProvider({
  roomData,
  children,
}: {
  roomData: RoomData;
  children: React.ReactNode;
}) {
  const [showCountdown, setShowCountdown] = useState(false);

  return (
    <RoomDetailContext.Provider
      value={{ roomData, showCountdown, setShowCountdown }}
    >
      {children}
    </RoomDetailContext.Provider>
  );
}

export function useRoomDetail() {
  const context = useContext(RoomDetailContext);

  if (!context) {
    throw new Error("useRoomDetail must be used within a RoomDetailProvider");
  }

  return context;
}
