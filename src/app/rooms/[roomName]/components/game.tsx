"use client";

import Image from "next/image";
import { PlayerList } from "../components/player-list";

import { useStorage } from "@liveblocks/react/suspense";
import { FlipCard } from "./flip-card";
import { useCardHandling } from "../hooks/card-handling";

// Mock data for players

export default function Game() {
  const cardsStorage = useStorage((root) => root.gameCards);
  const firstSelectedCardId = useStorage((root) => root.firstSelectedId);
  const secondSelectedCardId = useStorage((root) => root.secondSelectedId);

  const { handleCardClick } = useCardHandling();

  //console.log(cardsStorage);
  console.log(firstSelectedCardId);
  console.log(secondSelectedCardId);

  return (
    <div className="min-h-screen bg-[#2E63A4] p-8">
      <div className="container mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center">
            <Image
              src={"/logo.webp"}
              width={150}
              height={100}
              alt="logo"
              className="mb-4"
            />
          </div>
          <div className="grid grid-cols-[300px_1fr] gap-10">
            <PlayerList />

            <div className="relative">
              <div className="grid grid-cols-5 gap-2 lg:grid-cols-6 2xl:grid-cols-8">
                {cardsStorage.map((card) => {
                  return (
                    <FlipCard
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      front={
                        <div>
                          <Image
                            src={card.imageUrl}
                            alt={card.id}
                            fill
                            className="h-full w-full rounded-lg object-cover"
                          />
                        </div>
                      }
                      disabled={
                        card.isMatched || card.id === firstSelectedCardId
                      }
                      back={<span className="text-2xl">☠️</span>}
                      isFlipped={
                        card.isMatched ||
                        card.id === firstSelectedCardId ||
                        card.id === secondSelectedCardId
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
