import React, { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { queryClient } from "@/query/client";
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from "@/query/mutations/card";
import { cardDetailOptions } from "@/query/options/card";

export const Route = createFileRoute("/_auth/app/cards/$cardId/")({
  component: CardDetailComponent,
  loader: (opts) => {
    return opts.context.queryClient.ensureQueryData(
      cardDetailOptions({
        cardId: opts.params.cardId,
      }),
    );
  },
});
function CardDetailComponent() {
  const { cardId } = Route.useParams();
  const navigate = Route.useNavigate();
  const { data: cardData } = useSuspenseQuery(
    cardDetailOptions({
      cardId,
    }),
  );
  if (!cardData) {
    return <div>Card data not found.</div>;
  }
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTradeStatus, setSelectedTradeStatus] = useState<string>(
    cardData.tradeStatus,
  );
  const deleteCardMutation = useDeleteCardMutation(cardId);
  const updateCardMutation = useUpdateCardMutation(cardId);
  const handleDelete = () => {
    deleteCardMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Card deleted successfully");
        navigate({ to: "/app/cards" });
      },
      onError: () => {
        toast.error("Failed to delete card");
      },
    });
  };
  const handleTradeStatusChange = (status: string) => {
    setSelectedTradeStatus(status);
    updateCardMutation.mutate(
      { card: { tradeStatus: status as any } },
      {
        onSuccess: () => {
          toast.success("Trade status updated successfully");
        },
        onError: () => {
          toast.error("Failed to update trade status");
        },
      },
    );
  };
  const renderConditionBadge = (condition: string) => {
    const conditionColors: Record<string, string> = {
      mint: "bg-green-100 text-green-800",
      "near-mint": "bg-blue-100 text-blue-800",
      "light-play": "bg-yellow-100 text-yellow-800",
      "heavy-play": "bg-orange-100 text-orange-800",
      damaged: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${conditionColors[condition] || "bg-gray-100 text-gray-800"}`}
      >
        {condition.replace("-", " ")}
      </span>
    );
  };
  const renderRarityBadge = (rarity: string) => {
    const rarityColors: Record<string, string> = {
      common: "bg-gray-100 text-gray-800",
      uncommon: "bg-green-100 text-green-800",
      rare: "bg-blue-100 text-blue-800",
      "holo-rare": "bg-purple-100 text-purple-800",
      "ultra-rare": "bg-pink-100 text-pink-800",
      "secret-rare": "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${rarityColors[rarity] || "bg-gray-100 text-gray-800"}`}
      >
        {rarity.replace("-", " ")}
      </span>
    );
  };
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{cardData.cardName}</h1>
        <div className="flex space-x-2">
          <Button asChild>
            <Link to="/app/cards/$cardId/edit" params={{ cardId }}>
              Edit Card
            </Link>
          </Button>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Card</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Card</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this card? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex justify-center">
              {cardData.images && cardData.images.length > 0 ? (
                <div className="relative w-full max-w-md">
                  <img
                    src={cardData.images[0]}
                    alt={cardData.cardName}
                    className="w-full rounded-lg object-contain shadow-md"
                    style={{ maxHeight: "400px" }}
                  />
                  {cardData.images.length > 1 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto">
                      {cardData.images.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${cardData.cardName} - ${index + 1}`}
                          className="h-16 w-16 cursor-pointer rounded-md border-2 border-transparent object-cover hover:border-blue-500"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="flex w-full max-w-md items-center justify-center rounded-lg bg-gray-200"
                  style={{ height: "400px" }}
                >
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="mb-4 text-lg font-semibold">Card Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Set</p>
                    <p className="font-medium">
                      {cardData.cardSet?.name || "Unknown Set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rarity</p>
                    <div>{renderRarityBadge(cardData.rarity)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <div>{renderConditionBadge(cardData.condition)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{cardData.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Value</p>
                    <p className="font-medium">
                      ${cardData.estimatedValue.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Added On</p>
                    <p className="font-medium">
                      {formatDate(cardData.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {cardData.specialAttributes &&
                cardData.specialAttributes.length > 0 && (
                  <div>
                    <h3 className="text-md mb-2 font-semibold">
                      Special Attributes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cardData.specialAttributes.map(
                        (attribute: string, index: number) => (
                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800"
                          >
                            {attribute}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

              <div>
                <h3 className="text-md mb-2 font-semibold">Trade Status</h3>
                <Select
                  value={selectedTradeStatus}
                  onValueChange={handleTradeStatusChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select trade status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wanted">Wanted</SelectItem>
                    <SelectItem value="for-trade">For Trade</SelectItem>
                    <SelectItem value="not-for-trade">Not For Trade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
