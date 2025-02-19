"use client";

import Image from "next/image";
import { PlayerList } from "../components/player-list";

import {
  useEventListener,
  useSelf,
  useStorage,
} from "@liveblocks/react/suspense";
import { FlipCard } from "./flip-card";
import { useCardHandling } from "../hooks/card-handling";
import { useRoomDetail } from "../hooks/room-detail";
import { OwnerOverlay, PlayerOverlay } from "./overlay";
import { ROOM_EVENTS } from "liveblocks.config";
import { Countdown } from "./countdown";
import { cn } from "~/lib/utils";

export default function Game() {
  const cardsStorage = useStorage((root) => root.gameCards);
  const firstSelectedCardId = useStorage((root) => root.firstSelectedId);
  const secondSelectedCardId = useStorage((root) => root.secondSelectedId);
  const animatingMatchIds = useStorage((root) => root.animatingMatchIds);
  const animatingErrorIds = useStorage((root) => root.animatingErrorIds);

  const { roomData, showCountdown, setShowCountdown } = useRoomDetail();

  const { handleCardClick } = useCardHandling();
  const myId = useSelf((self) => self.id);
  const isOwner = roomData.ownerId === myId;

  useEventListener(({ event }) => {
    if (event.type === ROOM_EVENTS.GAME_STARTING) {
      setShowCountdown(true);
    }
  });

  return (
    <>
      {showCountdown && (
        <Countdown onFinished={() => setShowCountdown(false)} />
      )}

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
                        front={<div className="text-3xl">☠️</div>}
                        disabled={
                          card.isMatched || card.id === firstSelectedCardId
                        }
                        className={cn({
                          "animate-match-card": animatingMatchIds.includes(
                            card.id,
                          ),
                          "animate-error-card": animatingErrorIds.includes(
                            card.id,
                          ),
                        })}
                        back={
                          <div>
                            <Image
                              src={card.imageUrl}
                              alt={card.id}
                              fill
                              className="h-full w-full rounded-lg object-cover"
                            />
                          </div>
                        }
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
              {isOwner ? <OwnerOverlay /> : <PlayerOverlay />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
