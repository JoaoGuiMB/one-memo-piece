import { useMutation } from "@liveblocks/react";

export function useCardHandling() {
  const handleErrorCards = useMutation(({ storage }) => {
    const firstSelectedCardId = storage.get("firstSelectedId");
    const secondSelectedCardId = storage.get("secondSelectedId");
    const cards = storage.get("gameCards");

    if (!firstSelectedCardId || !secondSelectedCardId) return;

    const errorIds = [firstSelectedCardId, secondSelectedCardId];

    setTimeout(() => {
      // Turn cards back
      errorIds.forEach((id) => {
        const cardIndex = cards.findIndex((card) => card.get("id") === id);
        if (cardIndex === -1) return;
        cards.get(cardIndex)?.update({ isMatched: false });
      });

      storage.set("firstSelectedId", null);
      storage.set("secondSelectedId", null);

      // Reset selection
      storage.set("canSelect", true);

      // const currentPlayerId = storage.get("currentTurnPlayerId");
      // if (!currentPlayerId) return;

      // Move to next player
      // const nextPlayerId = getNextPlayerId({
      //   currentId: currentPlayerId,
      //   playerStates: storage.get("playerStates"),
      // });
      // storage.set("currentTurnPlayerId", nextPlayerId);
    }, 500);
  }, []);

  const handleMatchedCards = useMutation(({ storage }) => {
    const cards = storage.get("gameCards");
    const firstSelectedId = storage.get("firstSelectedId");
    const secondSelectedId = storage.get("secondSelectedId");

    const firstCard = cards.find((card) => card.get("id") === firstSelectedId);
    const secondCard = cards.find(
      (card) => card.get("id") === secondSelectedId,
    );

    if (!firstCard || !secondCard) return;
    const matchedCardsIds = [firstSelectedId, secondSelectedId];

    matchedCardsIds.forEach((cardId) => {
      const cardIndex = cards.findIndex((card) => card.get("id") === cardId);
      if (cardIndex === -1) return;
      cards.get(cardIndex)?.update({ isMatched: true });
    });

    console.log(cards);
    setTimeout(() => {
      storage.set("firstSelectedId", null);
      storage.set("secondSelectedId", null);
      storage.set("canSelect", true);
    }, 1000);
  }, []);

  const handleMatchedOrErrorCards = useMutation(
    ({ storage, self }) => {
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
        console.log("matched");
        handleMatchedCards();
      } else {
        handleErrorCards();
        // handle error cards
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
