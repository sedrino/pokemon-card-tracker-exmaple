import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/query/client";
import { cardKeys } from "@/query/options/card";
import { $createCard, $deleteCard, $updateCard } from "@/server/functions/card";

type CreateCardInput = Parameters<typeof $createCard>[0]["data"];
export function useCreateCardMutation() {
  return useMutation({
    mutationFn: async (data: CreateCardInput) => {
      const result = await $createCard({ data });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cardKeys.all(),
      });
    },
  });
}
export function useDeleteCardMutation(cardId: string) {
  return useMutation({
    mutationFn: async () => {
      const result = await $deleteCard({ data: { cardId } });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cardKeys.all(),
      });
    },
  });
}
type UpdateCardInput = Omit<
  Parameters<typeof $updateCard>[0]["data"],
  "cardId"
>;
export function useUpdateCardMutation(cardId: string) {
  return useMutation({
    mutationFn: async (data: UpdateCardInput) => {
      const result = await $updateCard({ data: { cardId, ...data } });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cardKeys.byId({ cardId }),
      });
      queryClient.invalidateQueries({
        queryKey: cardKeys.all(),
      });
    },
  });
}
