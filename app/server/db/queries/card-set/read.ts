import { desc, isNull, sql } from "drizzle-orm";

import { db } from "@/server/db/connection";
import { tableCardSet } from "@/server/db/schema";

export async function getTotalSetsCount() {
  const result = await db.select().from(tableCardSet);
  return result.length;
}
export const findCardSets = async (userId: string) => {
  const results = await db
    .select()
    .from(tableCardSet)
    .where(isNull(tableCardSet.deletedAt));
  return results;
};
export const findCardSetsCount = async () => {
  const result = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(tableCardSet);
  return result[0].count;
};
export const findCardSetsPaginated = async (
  {
    page = 1,
    pageSize = 50,
  }: {
    page?: number;
    pageSize?: number;
  },
  userId?: string,
) => {
  const offset = (page - 1) * pageSize;
  let query = db
    .select({
      cardSet: tableCardSet,
    })
    .from(tableCardSet)
    .limit(pageSize)
    .offset(offset)
    .orderBy(desc(tableCardSet.createdAt));
  return query;
};
