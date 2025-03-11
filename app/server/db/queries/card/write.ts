import { and, eq, SQL } from "drizzle-orm";

import { db } from "@/server/db/connection";
import { CardCondition, CardInsert, CardRarity, CardTradeStatus, CardUpdate, tableCard } from "@/server/db/schema";

export async function addCard(data: {
  userId: string;
  card: {
    cardName: string;
    cardSetId: string;
    rarity: string;
    condition: string;
    specialAttributes?: string[] | undefined;
    quantity: number;
    tradeStatus: string;
    estimatedValue: number;
    images?: string[] | undefined;
  };
}) {
  const { userId, card } = data;
  const cardInsert: CardInsert = {
    userId,
    cardSetId: card.cardSetId,
    cardName: card.cardName,
    rarity: card.rarity as CardRarity,
    condition: card.condition as CardCondition,
    specialAttributes: card.specialAttributes,
    quantity: card.quantity,
    tradeStatus: card.tradeStatus as CardTradeStatus,
    estimatedValue: card.estimatedValue,
    images: card.images,
  };
  const results = await db.insert(tableCard).values(cardInsert).returning();
  return results[0];
}
export const deleteCard = async (cardId: string, userId: string) => {
  const results = await db
    .delete(tableCard)
    .where(eq(tableCard.cardId, cardId))
    .returning();
  return results;
};
export const updateCard = async (
  cardId: string,
  card: CardUpdate,
  userId: string,
) => {
  const whereConditions: (SQL<unknown> | undefined)[] = [
    eq(tableCard.cardId, cardId),
    eq(tableCard.userId, userId),
  ];
  const results = await db
    .update(tableCard)
    .set({ ...card })
    .where(and(...whereConditions))
    .returning();
  return results[0];
};
