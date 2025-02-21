import { useMutation } from "@liveblocks/react";
import { determineWinner, getNextPlayerId } from "../lib/utils";

const ANIMATION_DURATION_RESET_TIMEOUT = 1500;

// We need to let the card animation happen before we do the sound + animation
// Otherwise it's not in sync
const ANIMATION_START_DELAY = 450;

export function useCardHandling() {
  const handleErrorCards = useMutation(({ storage }) => {
    const firstSelectedCardId = storage.get("firstSelectedId");
    const secondSelectedCardId = storage.get("secondSelectedId");
    const cards = storage.get("gameCards");

    if (!firstSelectedCardId || !secondSelectedCardId) return;

    const errorIds = [firstSelectedCardId, secondSelectedCardId];

    setTimeout(() => {
      storage.set("animatingErrorIds", errorIds);
    }, ANIMATION_START_DELAY);

    setTimeout(() => {
      // Turn cards back
      errorIds.forEach((id) => {
        const cardIndex = cards.findIndex((card) => card.get("id") === id);
        if (cardIndex === -1) return;
        cards.get(cardIndex)?.update({ isMatched: false });
      });

      storage.set("animatingErrorIds", []);
      storage.set("firstSelectedId", null);
      storage.set("secondSelectedId", null);

      // Reset selection
      storage.set("canSelect", true);

      const currentPlayerId = storage.get("currentTurnPlayerId");
      if (!currentPlayerId) return;

      //Move to next player
      const nextPlayerId = getNextPlayerId({
        currentId: currentPlayerId,
        playerStates: storage.get("playerStates"),
      });
      storage.set("currentTurnPlayerId", nextPlayerId ?? null);
    }, ANIMATION_DURATION_RESET_TIMEOUT);
  }, []);

  const handleMatchedCards = useMutation(({ storage }) => {
    const currentUserId = storage.get("currentTurnPlayerId");
    // Should never happen in this case
    if (!currentUserId) return;

    const cards = storage.get("gameCards");
    const totalPairsMatched = storage.get("totalPairsMatched");
    const firstSelectedId = storage.get("firstSelectedId");
    const secondSelectedId = storage.get("secondSelectedId");

    const firstCard = cards.find((card) => card.get("id") === firstSelectedId);
    const secondCard = cards.find(
      (card) => card.get("id") === secondSelectedId,
    );

    if (!firstCard || !secondCard || !firstSelectedId || !secondSelectedId)
      return;
    const matchedCardsIds = [firstSelectedId, secondSelectedId];

    matchedCardsIds.forEach((cardId) => {
      const cardIndex = cards.findIndex((card) => card.get("id") === cardId);
      if (cardIndex === -1) return;
      cards.get(cardIndex)?.update({ isMatched: true });
    });

    const playerStates = storage.get("playerStates");
    const playerScore = playerStates.get(currentUserId);

    if (!playerScore) return;
    playerScore.update({
      collectedPairIds: [0],
      pairsCount: playerScore.get("pairsCount") + 1,
    });

    setTimeout(() => {
      storage.set("animatingMatchIds", matchedCardsIds);
    }, ANIMATION_START_DELAY);

    const newTotalMatched = totalPairsMatched + 1;
    storage.set("totalPairsMatched", newTotalMatched);
    const isGameFinished = newTotalMatched === storage.get("totalPairs");
    if (isGameFinished) {
      setTimeout(() => {
        storage.set("state", "FINISHED");
        storage.set("winningPlayerId", determineWinner({ storage }) ?? null);
      }, ANIMATION_DURATION_RESET_TIMEOUT);
    }

    setTimeout(() => {
      storage.set("animatingMatchIds", []);
      storage.set("firstSelectedId", null);
      storage.set("secondSelectedId", null);
      storage.set("canSelect", true);
    }, ANIMATION_DURATION_RESET_TIMEOUT);
  }, []);

  const handleMatchedOrErrorCards = useMutation(
    ({ storage }) => {
      const cards = storage.get("gameCards");
      const firstSelectedId = storage.get("firstSelectedId");
      const secondSelectedId = storage.get("secondSelectedId");
      const firstCard = cards.find(
        (card) => card.get("id") === firstSelectedId,
      );

      const secondCard = cards.find(
        (card) => card.get("id") === secondSelectedId,
      );

      if (firstCard?.get("imageUrl") === secondCard?.get("imageUrl")) {
        handleMatchedCards();
      } else {
        handleErrorCards();
      }
    },
    [handleMatchedCards, handleErrorCards],
  );

  const handleCardClick = useMutation(({ storage, self }, cardId: string) => {
    // storage.set("firstSelectedId", null);
    // storage.set("secondSelectedId", null);
    // storage.set("canSelect", true);
    if (!storage.get("canSelect")) {
      return;
    }

    if (storage.get("currentTurnPlayerId") !== self.id) return;

    if (storage.get("firstSelectedId") && storage.get("secondSelectedId")) {
      return;
    }

    const firstSelectedId = storage.get("firstSelectedId");

    if (!firstSelectedId) {
      storage.set("firstSelectedId", cardId);
    } else {
      storage.set("secondSelectedId", cardId);
      storage.set("canSelect", false);
      handleMatchedOrErrorCards();
    }
  }, []);

  return { handleCardClick };
}
