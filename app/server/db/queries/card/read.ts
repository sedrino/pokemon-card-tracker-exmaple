import { and, desc, eq, like, sql, SQL, sum } from "drizzle-orm";

import { db } from "@/server/db/connection";
import { CardRarity, CardSelect, tableCard, tableCardSet } from "@/server/db/schema";

export const findCardById = async (
  cardId: string,
  userId: string,
): Promise<
  | (CardSelect & {
      cardSet?: {
        cardSetId: string;
        name: string;
        createdAt: number;
        updatedAt: number;
        deletedAt: number | null;
      } | null;
    })
  | undefined
> => {
  const results = await db
    .select({
      card: tableCard,
      cardSet: tableCardSet,
    })
    .from(tableCard)
    .leftJoin(tableCardSet, eq(tableCard.cardSetId, tableCardSet.cardSetId))
    .where(and(eq(tableCard.cardId, cardId), eq(tableCard.userId, userId)));
  if (!results || results.length === 0) {
    return undefined;
  }
  const cardData = results[0].card;
  const cardSetData = results[0].cardSet;
  return {
    ...cardData,
    cardSet: cardSetData ?? null,
  };
};
export async function getCardRarityDistribution(userId: string) {
  const result = await db
    .select({
      rarity: tableCard.rarity,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(tableCard)
    .where(eq(tableCard.userId, userId))
    .groupBy(tableCard.rarity);
  return result;
}
export async function getCardSetCompletion(userId: string) {
  const result = await db
    .select({
      setName: tableCardSet.name,
      completedPercentage: sql<number>`CAST(COUNT(CASE WHEN ${tableCard.userId} = ${userId} THEN 1 END) AS REAL) * 100 / COUNT(${tableCard.cardId})`,
    })
    .from(tableCardSet)
    .leftJoin(tableCard, eq(tableCardSet.cardSetId, tableCard.cardSetId))
    .groupBy(tableCardSet.name)
    .all();
  return result;
}
export const getCardsCount = async (userId: string) => {
  const result = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(tableCard)
    .where(eq(tableCard.userId, userId));
  return result[0].count;
};
export async function getLastCardAddedDate(userId: string) {
  const result = await db
    .select({
      lastCardAddedDate: sql<Date>`MAX(${tableCard.createdAt})`,
    })
    .from(tableCard)
    .where(eq(tableCard.userId, userId));
  return result[0]?.lastCardAddedDate;
}
export const getRecentCardActivity = async (userId: string) => {
  const recentActivity = await db
    .select({
      action: sql<string>`CASE
        WHEN created_at = updated_at THEN 'Card Added'
        ELSE 'Card Updated'
      END`,
      cardName: tableCard.cardName,
      date: tableCard.updatedAt,
    })
    .from(tableCard)
    .where(eq(tableCard.userId, userId))
    .orderBy(desc(tableCard.updatedAt))
    .limit(5);
  return recentActivity;
};
export const getTotalCardValue = async (userId: string) => {
  const result = await db
    .select({
      totalValue: sum(tableCard.estimatedValue),
    })
    .from(tableCard)
    .where(tableCard.userId.eq(userId));
  return result[0]?.totalValue ?? 0;
};
export const getTradeStatusCounts = async (userId: string) => {
  const result = await db
    .select({
      wanted:
        sql<number>`count(case when ${tableCard.tradeStatus} = 'wanted' then 1 else null end)`.mapWith(
          Number,
        ),
      forTrade:
        sql<number>`count(case when ${tableCard.tradeStatus} = 'for-trade' then 1 else null end)`.mapWith(
          Number,
        ),
      notForTrade:
        sql<number>`count(case when ${tableCard.tradeStatus} = 'not-for-trade' then 1 else null end)`.mapWith(
          Number,
        ),
    })
    .from(tableCard)
    .where(eq(tableCard.userId, userId));
  return result[0];
};
interface FindCardsParams {
  userId: string;
  page: number;
  pageSize: number;
  search?: string;
  set?: string;
  rarity?: string;
}
export async function findCards({
  userId,
  page,
  pageSize,
  search,
  set,
  rarity,
}: FindCardsParams) {
  const offset = (page - 1) * pageSize;
  // IT IS VERY IMPORTANT THAT THE TYPE BE SET TO (SQL | undefined)[] query functions like and and or can return undefined!
  const whereConditions: (SQL | undefined)[] = [eq(tableCard.userId, userId)];
  if (search) {
    whereConditions.push(like(tableCard.cardName, `%${search}%`));
  }
  if (set) {
    whereConditions.push(eq(tableCard.cardSetId, set));
  }
  if (rarity) {
    whereConditions.push(eq(tableCard.rarity, rarity as CardRarity));
  }
  const cards = await db
    .select({
      cardId: tableCard.cardId,
      cardName: tableCard.cardName,
      rarity: tableCard.rarity,
      condition: tableCard.condition,
      quantity: tableCard.quantity,
      tradeStatus: tableCard.tradeStatus,
      estimatedValue: tableCard.estimatedValue,
      cardSet: {
        cardSetId: tableCardSet.cardSetId,
        name: tableCardSet.name,
      },
    })
    .from(tableCard)
    .leftJoin(tableCardSet, eq(tableCard.cardSetId, tableCardSet.cardSetId))
    .where(and(...whereConditions))
    .limit(pageSize)
    .offset(offset)
    .all();
  return cards;
}
export const findCardsCount = async ({
  userId,
  search,
  set,
  rarity,
}: {
  userId: string;
  search?: string;
  set?: string;
  rarity?: string;
}) => {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(tableCard)
    .where(
      and(
        eq(tableCard.userId, userId),
        search ? like(tableCard.cardName, `%${search}%`) : undefined,
        set ? eq(tableCard.cardSetId, set) : undefined,
        rarity ? eq(tableCard.rarity, rarity) : undefined,
      ),
    );
  return result[0].count;
};
