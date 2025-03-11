import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import { authMiddleware } from "@/middleware/auth";
import {
  findCardSets,
  getTotalSetsCount,
} from "@/server/db/queries/card-set/read";
import {
  findCardById,
  findCards,
  findCardsCount,
  getCardRarityDistribution,
  getCardsCount,
  getCardSetCompletion,
  getLastCardAddedDate,
  getRecentCardActivity,
  getTotalCardValue,
  getTradeStatusCounts,
} from "@/server/db/queries/card/read";
import {
  addCard,
  deleteCard,
  updateCard,
} from "@/server/db/queries/card/write";
import { CardCondition, CardRarity, CardTradeStatus } from "@/server/db/schema";

const GetCardByIdInput = z.object({
  cardId: z.string().min(1, "Card ID is required"),
});
export const $getCardById = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(zodValidator(GetCardByIdInput))
  .handler(async ({ data, context }) => {
    const card = await findCardById(data.cardId, context.userId);
    return card;
  });
const DashboardStatsSchema = z.object({});
export const $getDashboardStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const userId = context.userId;
    const totalCards = await getCardsCount(userId);
    const lastCardAddedDate = await getLastCardAddedDate(userId);
    const completedSets = await getCardSetCompletion(userId);
    const totalSets = await getTotalSetsCount();
    const totalValue = await getTotalCardValue(userId);
    const rarityDistribution = await getCardRarityDistribution(userId);
    const tradeStatusCounts = await getTradeStatusCounts(userId);
    const recentActivity = await getRecentCardActivity(userId);
    return {
      totalCards,
      lastCardAddedDate,
      completedSets: completedSets.length,
      totalSets,
      totalValue,
      rarityDistribution,
      tradeStatusCounts,
      recentActivity,
    };
  });
const listCardsInput = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).default(50),
  search: z.string().optional(),
  set: z.string().optional(),
  rarity: z.string().optional(),
});
export const $listCards = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(zodValidator(listCardsInput))
  .handler(async ({ data, context }) => {
    const cards = await findCards({
      ...data,
      userId: context.userId,
    });
    const total = await findCardsCount({
      userId: context.userId,
      search: data.search,
      set: data.set,
      rarity: data.rarity,
    });
    const sets = await findCardSets(context.userId);
    return {
      cards,
      total,
      sets,
    };
  });
const CreateCardInput = z.object({
  card: z.object({
    cardName: z.string().min(1, "Card name is required"),
    cardSetId: z.string().min(1, "Card set is required"),
    rarity: z.enum([
      "common",
      "uncommon",
      "rare",
      "holo-rare",
      "ultra-rare",
      "secret-rare",
    ] as const),
    condition: z.enum([
      "mint",
      "near-mint",
      "light-play",
      "heavy-play",
      "damaged",
    ] as const),
    specialAttributes: z.array(z.string()).optional(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    tradeStatus: z.enum(["wanted", "for-trade", "not-for-trade"] as const),
    estimatedValue: z.number().min(0, "Value must be a positive number"),
    images: z.array(z.string()).optional(),
  }),
});
export const $createCard = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(zodValidator(CreateCardInput))
  .handler(async ({ data, context }) => {
    const card = await addCard({ ...data, userId: context.userId });
    return card;
  });
const DeleteCardInput = z.object({
  cardId: z.string(),
});
export const $deleteCard = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(zodValidator(DeleteCardInput))
  .handler(async ({ data, context }) => {
    await deleteCard(data.cardId, context.userId);
  });
const UpdateCardInput = z.object({
  cardId: z.string(),
  card: z.object({
    cardName: z.string().min(1, "Card name is required").optional(),
    cardSetId: z.string().min(1, "Card set is required").optional(),
    rarity: z
      .enum([
        "common",
        "uncommon",
        "rare",
        "holo-rare",
        "ultra-rare",
        "secret-rare",
      ] as [CardRarity, ...CardRarity[]])
      .optional(),
    condition: z
      .enum(["mint", "near-mint", "light-play", "heavy-play", "damaged"] as [
        CardCondition,
        ...CardCondition[],
      ])
      .optional(),
    specialAttributes: z.array(z.string()).optional(),
    quantity: z.number().min(1, "Quantity must be at least 1").optional(),
    tradeStatus: z
      .enum(["wanted", "for-trade", "not-for-trade"] as [
        CardTradeStatus,
        ...CardTradeStatus[],
      ])
      .optional(),
    estimatedValue: z
      .number()
      .min(0, "Value must be a positive number")
      .optional(),
    images: z.array(z.string()).optional(),
  }),
});
export const $updateCard = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(zodValidator(UpdateCardInput))
  .handler(async ({ data, context }) => {
    const card = await updateCard(data.cardId, data.card, context.userId);
    return card;
  });
