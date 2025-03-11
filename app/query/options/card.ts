import { queryOptions } from "@tanstack/react-query";

import {
  $getCardById,
  $getDashboardStats,
  $listCards,
} from "@/server/functions/card";
import { $listCardSets } from "@/server/functions/card-set";

export const cardKeys = {
  all: () => [{ scope: "cards" }] as const,
  byId: ({ cardId }: { cardId: string }) =>
    [{ ...cardKeys.all()[0], cardId }] as const,
  list: (
    filters: {
      page?: number;
      pageSize?: number;
      search?: string;
      set?: string;
      rarity?: string;
    } = {},
  ) => [{ ...cardKeys.all()[0], ...filters }] as const,
};
export const cardDetailOptions = ({ cardId }: { cardId: string }) =>
  queryOptions({
    queryKey: cardKeys.byId({ cardId }),
    queryFn: async () => {
      const response = await $getCardById({ data: { cardId } });
      return response ?? null;
    },
  });
export const cardOptions = ({ cardId }: { cardId: string }) =>
  queryOptions({
    queryKey: cardKeys.byId({ cardId }),
    queryFn: async () => {
      const response = await $getCardById({ data: { cardId } });
      return response ?? null;
    },
  });
export const cardsListOptions = ({
  page = 1,
  pageSize = 50,
  search,
  set,
  rarity,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  set?: string;
  rarity?: string;
} = {}) =>
  queryOptions({
    queryKey: cardKeys.list({ page, pageSize, search, set, rarity }),
    queryFn: async () => {
      const response = await $listCards({
        data: { page, pageSize, search, set, rarity },
      });
      return response;
    },
  });
export const dashboardStatsOptions = () =>
  queryOptions({
    queryKey: [{ scope: "dashboardStats" }] as const,
    queryFn: async () => {
      const response = await $getDashboardStats();
      return response;
    },
  });
export const cardSetKeys = {
  all: () => [{ scope: "cardSets" }] as const,
};
export const cardSetsListOptions = () =>
  queryOptions({
    queryKey: cardSetKeys.all(),
    queryFn: async () => {
      const response = await $listCardSets({ data: {} });
      return response;
    },
  });
