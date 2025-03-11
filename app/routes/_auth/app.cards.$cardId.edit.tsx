import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCardMutation } from "@/query/mutations/card";
import { cardOptions } from "@/query/options/card";
import { cardSetsListOptions } from "@/query/options/card-set";

export const Route = createFileRoute("/_auth/app/cards/$cardId/edit")({
  component: EditCardComponent,
  loader: (opts) => {
    return opts.context.queryClient.ensureQueryData(
      cardOptions({
        cardId: opts.params.cardId,
      }),
    );
  },
});
function EditCardComponent() {
  const { cardId } = Route.useParams();
  const navigate = Route.useNavigate();
  const updateCardMutation = useUpdateCardMutation(cardId);
  const { data: cardData } = useSuspenseQuery(
    cardOptions({
      cardId,
    }),
  );
  if (!cardData) {
    return <div>Card not found</div>;
  }
  const { data: cardSetsData } = useSuspenseQuery(cardSetsListOptions({}));
  const form = useForm({
    defaultValues: {
      card: {
        cardName: cardData.cardName,
        cardSetId: cardData.cardSet ? cardData.cardSet.cardSetId : "",
        rarity: cardData.rarity,
        condition: cardData.condition,
        specialAttributes: cardData.specialAttributes || [],
        quantity: cardData.quantity,
        tradeStatus: cardData.tradeStatus,
        estimatedValue: cardData.estimatedValue,
        images: cardData.images || [],
      },
    },
    onSubmit: async ({ value }) => {
      await updateCardMutation.mutateAsync(
        { cardId, card: value.card },
        {
          onSuccess: () => {
            toast.success("Card updated successfully");
            navigate({ to: "/app/cards/$cardId", params: { cardId } });
          },
          onError: () => {
            toast.error("Failed to update card");
          },
        },
      );
    },
  });
  const handleCancel = () => {
    navigate({ to: "/app/cards/$cardId", params: { cardId } });
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImageUrls = files.map((file) => URL.createObjectURL(file));
      form.setFieldValue("card.images", [
        ...(form.getFieldValue("card.images") || []),
        ...newImageUrls,
      ]);
    }
  };
  const removeImage = (index: number) => {
    const currentImages = form.getFieldValue("card.images") || [];
    form.setFieldValue(
      "card.images",
      currentImages.filter((_, i: number) => i !== index),
    );
  };
  return (
    <div className="flex flex-col gap-4 p-8">
      <Card>
        <CardContent className="pt-6">
          <h1 className="mb-6 text-2xl font-bold">Edit Pokémon Card</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="card.cardName"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Name *
                  </label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="card.cardSetId"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Set *
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a card set" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardSetsData?.cardSets?.map((set) => (
                        <SelectItem key={set.cardSetId} value={set.cardSetId}>
                          {set.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="card.rarity"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rarity *
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value: string) => field.handleChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="uncommon">Uncommon</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="holo-rare">Holo Rare</SelectItem>
                      <SelectItem value="ultra-rare">Ultra Rare</SelectItem>
                      <SelectItem value="secret-rare">Secret Rare</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="card.condition"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Condition *
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value: string) => field.handleChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mint">Mint</SelectItem>
                      <SelectItem value="near-mint">Near Mint</SelectItem>
                      <SelectItem value="light-play">Lightly Played</SelectItem>
                      <SelectItem value="heavy-play">Heavily Played</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="card.specialAttributes"
              mode="array"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Special Attributes
                  </label>
                  <Textarea
                    id={field.name}
                    placeholder="Enter special attributes (e.g., Holographic, Full Art, etc.) - one per line"
                    value={field.state.value?.join("\n") || ""}
                    onChange={(e) => {
                      const values = e.target.value
                        .split("\n")
                        .filter((v) => v.trim() !== "");
                      field.handleChange(values);
                    }}
                    rows={3}
                  />
                </div>
              )}
            />

            <form.Field
              name="card.quantity"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity *
                  </label>
                  <Input
                    id={field.name}
                    type="number"
                    min="1"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      field.handleChange(value);
                    }}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="card.tradeStatus"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trade Status *
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value: string) => field.handleChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trade status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wanted">Wanted</SelectItem>
                      <SelectItem value="for-trade">For Trade</SelectItem>
                      <SelectItem value="not-for-trade">
                        Not For Trade
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field name="card.estimatedValue">
              {(field: any) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Estimated Value ($) *
                  </label>
                  <Input
                    id={field.name}
                    type="number"
                    step="0.01"
                    min="0"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      field.handleChange(value);
                    }}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Images
              </label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1"
              />
              <p className="mt-1 text-sm text-gray-500">
                Upload images of your card (front, back, close-ups)
              </p>

              <form.Field
                name="card.images"
                mode="array"
                children={(field) => (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {field.state.value?.map(
                      (imageUrl: string, index: number) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Card image ${index + 1}`}
                            className="h-40 w-full rounded-md object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute right-1 top-1"
                            onClick={() => removeImage(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <form.Subscribe
                selector={(state: {
                  canSubmit: boolean;
                  isSubmitting: boolean;
                }) => [state.canSubmit, state.isSubmitting]}
                children={(state) => {
                  const [canSubmit, isSubmitting] = state as [boolean, boolean];
                  return (
                    <Button type="submit" disabled={!canSubmit || isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  );
                }}
              />
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
