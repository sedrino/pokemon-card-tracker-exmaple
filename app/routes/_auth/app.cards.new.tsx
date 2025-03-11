import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";

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
import { useCreateCardMutation } from "@/query/mutations/card";
import { cardSetsListOptions } from "@/query/options/card-set";
import { CardCondition, CardRarity, CardTradeStatus } from "@/server/db/schema";

export const Route = createFileRoute("/_auth/app/cards/new")({
  component: CreateCardComponent,
});
const cardFormSchema = z.object({
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
function CreateCardComponent() {
  const navigate = Route.useNavigate();
  const createCardMutation = useCreateCardMutation();
  const { data: cardSetsData } = useSuspenseQuery(cardSetsListOptions({}));
  const form = useForm({
    defaultValues: {
      card: {
        cardName: "",
        cardSetId: "",
        rarity: "common" as CardRarity,
        condition: "near-mint" as CardCondition,
        specialAttributes: [] as string[],
        quantity: 1,
        tradeStatus: "not-for-trade" as CardTradeStatus,
        estimatedValue: 0,
        images: [] as string[],
      },
    },
    onSubmit: async ({ value }) => {
      await createCardMutation.mutateAsync(value, {
        onSuccess: () => {
          toast.success("Card added to collection successfully");
          navigate({ to: "/app/cards" });
        },
        onError: () => {
          toast.error("Failed to add card to collection");
        },
      });
    },
  });
  const handleCancel = () => {
    navigate({ to: "/app/cards" });
  };
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you'd upload these files to a server and get URLs back
    // For this example, we'll create object URLs
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    form.setFieldValue("card.images", [
      ...(form.getFieldValue("card.images") || []),
      ...imageUrls,
    ]);
  };
  // Handle special attributes input
  const handleSpecialAttributesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const attributes = e.target.value
      .split(",")
      .map((attr) => attr.trim())
      .filter((attr) => attr.length > 0);
    form.setFieldValue("card.specialAttributes", attributes);
  };
  return (
    <div className="flex flex-col gap-4 p-8">
      <Card>
        <CardContent className="pt-6">
          <h1 className="mb-6 text-2xl font-bold">Add New Pokémon Card</h1>

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
                    placeholder="Enter Pokémon card name"
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
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Select card set" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardSetsData?.cardSets?.map((item) => (
                        <SelectItem
                          key={item.cardSet.cardSetId}
                          value={item.cardSet.cardSetId}
                        >
                          {item.cardSet.name}
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
                    Rarity
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value: string) =>
                      field.handleChange(value as CardRarity)
                    }
                  >
                    <SelectTrigger id={field.name}>
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
                    Condition
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value: string) =>
                      field.handleChange(value as CardCondition)
                    }
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mint">Mint</SelectItem>
                      <SelectItem value="near-mint">Near Mint</SelectItem>
                      <SelectItem value="light-play">Light Play</SelectItem>
                      <SelectItem value="heavy-play">Heavy Play</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Special Attributes
              </label>
              <Textarea
                placeholder="Enter special attributes separated by commas (e.g., holographic, first edition, shadowless)"
                onChange={handleSpecialAttributesChange}
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter attributes separated by commas
              </p>
            </div>

            <form.Field
              name="card.quantity"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <Input
                    id={field.name}
                    type="number"
                    min="1"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseInt(e.target.value) || 1)
                    }
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
                    Trade Status
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value: string) =>
                      field.handleChange(value as CardTradeStatus)
                    }
                  >
                    <SelectTrigger id={field.name}>
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
                </div>
              )}
            />

            <form.Field
              name="card.estimatedValue"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Estimated Value ($)
                  </label>
                  <Input
                    id={field.name}
                    type="number"
                    step="0.01"
                    min="0"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseFloat(e.target.value) || 0)
                    }
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Images
              </label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload front and back images of your card
              </p>

              <form.Field
                name="card.images"
                children={(field) => (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.state.value?.map((imageUrl, index) => (
                      <div key={index} className="relative h-24 w-24">
                        <img
                          src={imageUrl}
                          alt={`Card image ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <button
                          type="button"
                          className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
                          onClick={() => {
                            const newImages = [...(field.state.value || [])];
                            newImages.splice(index, 1);
                            field.handleChange(newImages);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting}>
                    {isSubmitting ? "Saving..." : "Add Card to Collection"}
                  </Button>
                )}
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
