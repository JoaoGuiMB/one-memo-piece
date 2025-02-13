"use client";

import Image from "next/image";
import { PlayerList } from "../components/player-list";

import StartGameButton from "./start-game";
import { useStorage } from "@liveblocks/react/suspense";

// Mock data for players

export default function Game({ roomName }: { roomName: string }) {
  const cardsStorage = useStorage((root) => root.gameCards);

  console.log(cardsStorage);

  return (
    <div className="flex min-h-screen overflow-y-auto bg-[#2E63A4]">
      <StartGameButton roomName={roomName} />
      <div className="w-1/6 rounded-lg bg-[#58acf4] p-6 shadow-lg backdrop-blur-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Players</h2>
        <PlayerList />
      </div>

      {/* Cards Grid */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="grid grid-cols-8 gap-4">
          {[...cardsStorage].map((card, index) => (
            <div
              key={card.id}
              className={`h-40 w-40 transform cursor-pointer rounded-lg shadow-lg transition-transform duration-300 ${
                card.isMatched ? "rotate-y-180" : ""
              }`}
              //onClick={() => handleCardClick(index)}
            >
              <div className="relative h-full w-full">
                {/* Front of the Card */}
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-orange-500">
                  <span className="text-2xl text-white">?</span>
                </div>

                {/* Back of the Card */}
                <div className="rotate-y-180 absolute inset-0 flex transform items-center justify-center rounded-lg bg-[#58acf4]">
                  <div className="h-32 w-32">
                    <Image
                      src={card.imageUrl}
                      alt={card.id}
                      fill
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
