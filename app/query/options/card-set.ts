import { queryOptions } from "@tanstack/react-query";

// NOTE: import paths should always use - instead of CamelCase or PascalCase
// For example: import {$createWidget, $editWidget, $deleteWidget} from "@/server/functions/userActions"; should actually be import {$createWidget, $editWidget, $deleteWidget} from "@/server/functions/user-actions";
// the last part of the path should always be singular
import { $listCardSets } from "@/server/functions/card-set";

export const cardSetKeys = {
  all: () => [{ scope: "cardSets" }] as const,
};
export const cardSetsListOptions = ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
} = {}) =>
  queryOptions({
    queryKey: cardSetKeys.all(),
    queryFn: async () => {
      const response = await $listCardSets({ data: { page, pageSize } });
      return response;
    },
  });
