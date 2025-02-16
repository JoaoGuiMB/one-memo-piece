import { useMutation } from "@liveblocks/react";

export function useCardHandling() {
  const handleCardClick = useMutation(({ storage, self }, cardId: string) => {
    console.log("cardId");
    if (!storage.get("canSelect")) {
      return;
    }

    console.log("test");

    if (storage.get("firstSelectedId") && storage.get("secondSelectedId")) {
      return;
    }

    console.log("sdj");

    const firstSelectedId = storage.get("firstSelectedId");

    if (!firstSelectedId) {
      storage.set("firstSelectedId", cardId);
    } else {
      storage.set("secondSelectedId", cardId);
      storage.set("canSelect", false);
    }
  }, []);

  return { handleCardClick };
}
