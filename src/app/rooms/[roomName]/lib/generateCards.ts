import { createId } from "@paralleldrive/cuid2";

const baseAssetsPath = "/gameAssets";

const CARD_IMAGES = [
  `${baseAssetsPath}/luffy.webp`,
  `${baseAssetsPath}/zoro.webp`,
  `${baseAssetsPath}/nami2.png`,
  `${baseAssetsPath}/usopp.png`,
  `${baseAssetsPath}/sanji.png`,
  `${baseAssetsPath}/chopper.webp`,
  `${baseAssetsPath}/robin2.webp`,
  `${baseAssetsPath}/franky.webp`,
  `${baseAssetsPath}/brook.webp`,
  `${baseAssetsPath}/jimbei.webp`,
  `${baseAssetsPath}/ace.png`,
  `${baseAssetsPath}/kaido.webp`,
  `${baseAssetsPath}/marco.png`,
  `${baseAssetsPath}/whitebeard.png`,
  `${baseAssetsPath}/blackbeard.png`,
  `${baseAssetsPath}/shanks.png`,
] as const;

type CardDefinition = {
  pairId: number;
  image: string;
};

export type GameCard = {
  id: string;
  pairId: number;
  image: string;
  isMatched: boolean;
};

const CARD_DEFINITIONS: Array<CardDefinition> = CARD_IMAGES.map(
  (image, index) => ({
    pairId: index + 1,
    image,
  }),
);

// Fisher-Yates shuffle
function shuffleCards<T extends object>(cards: T[]): T[] {
  // Create a copy of the original array to avoid mutating it
  const shuffledCards = [...cards];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap cards[i] and cards[j]
    const temp = shuffledCards[i];
    shuffledCards[i] = shuffledCards[j]!;
    shuffledCards[j] = temp!;
  }

  return shuffledCards;
}

export function createGameCards(): Array<GameCard> {
  const cards = CARD_DEFINITIONS.flatMap((def) => [
    {
      id: createId(),
      pairId: def.pairId,
      image: def.image,
      isMatched: false,
    } satisfies GameCard,
    {
      id: createId(),
      pairId: def.pairId,
      image: def.image,
      isMatched: false,
    } satisfies GameCard,
  ]);

  return shuffleCards(cards);
}
