import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  SearchSchemaInput,
} from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { toast } from "sonner";
import { z } from "zod";

import { BasicTable } from "@/components/tables/basic-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient } from "@/query/client";
import { useDeleteCardMutation } from "@/query/mutations/card";
import { cardsListOptions } from "@/query/options/card";

const cardsSearchSchema = z.object({
  page: z.coerce.number().min(1).catch(1),
  pageSize: z.coerce.number().min(1).catch(50),
  search: z.string().optional(),
  set: z.string().optional(),
  rarity: z.string().optional(),
});
type ZSearchInput = z.input<typeof cardsSearchSchema>;
export const Route = createFileRoute("/_auth/app/cards/")({
  component: CardsListComponent,
  validateSearch: (search: ZSearchInput & SearchSchemaInput) =>
    cardsSearchSchema.parse(search),
  loaderDeps: ({ search: { page, pageSize, search, set, rarity } }) => ({
    page,
    pageSize,
    search,
    set,
    rarity,
  }),
  loader: (opts) => {
    return opts.context.queryClient.ensureQueryData(
      cardsListOptions({
        page: opts.deps.page,
        pageSize: opts.deps.pageSize,
        search: opts.deps.search,
        set: opts.deps.set,
        rarity: opts.deps.rarity,
      }),
    );
  },
});
function CardsListComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: cardsData } = useSuspenseQuery(cardsListOptions(search));
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState<string | null>(null);
  const columnHelper = React.useMemo(
    () => createColumnHelper<(typeof cardsData.cards)[0]>(),
    [cardsData],
  );
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("cardName", {
        header: "Card Name",
        cell: (info) => (
          <Button variant="link" asChild>
            <Link
              to="/app/cards/$cardId"
              params={{ cardId: info.row.original.cardId }}
            >
              {info.getValue()}
            </Link>
          </Button>
        ),
      }),
      columnHelper.accessor((row) => row.cardSet?.name, {
        id: "set",
        header: "Set",
        cell: (info) => info.getValue() || "N/A",
      }),
      columnHelper.accessor("rarity", {
        header: "Rarity",
        cell: (info) => (
          <span className="capitalize">
            {info.getValue().replace("-", " ")}
          </span>
        ),
      }),
      columnHelper.accessor("condition", {
        header: "Condition",
        cell: (info) => (
          <span className="capitalize">
            {info.getValue().replace("-", " ")}
          </span>
        ),
      }),
      columnHelper.accessor("quantity", {
        header: "Quantity",
      }),
      columnHelper.accessor("tradeStatus", {
        header: "Trade Status",
        cell: (info) => {
          const status = info.getValue();
          let className = "";
          switch (status) {
            case "wanted":
              className = "text-blue-600";
              break;
            case "for-trade":
              className = "text-green-600";
              break;
            case "not-for-trade":
              className = "text-gray-600";
              break;
          }
          return (
            <span className={`capitalize ${className}`}>
              {status.replace("-", " ")}
            </span>
          );
        },
      }),
      columnHelper.accessor("estimatedValue", {
        header: "Estimated Value",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link
                to="/app/cards/$cardId"
                params={{ cardId: info.row.original.cardId }}
              >
                View
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link
                to="/app/cards/$cardId/edit"
                params={{ cardId: info.row.original.cardId }}
              >
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setCardToDelete(info.row.original.cardId);
                setOpenDeleteDialog(true);
              }}
            >
              Delete
            </Button>
          </div>
        ),
      }),
    ],
    [columnHelper],
  );
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;
    const setFilter = formData.get("set") as string;
    const rarityFilter = formData.get("rarity") as string;
    navigate({
      to: "/app/cards",
      search: {
        ...search,
        search: searchTerm || undefined,
        set: setFilter || undefined,
        rarity: rarityFilter || undefined,
        page: 1, // Reset to first page on new search
      },
    });
  };
  const handleDeleteCard = () => {
    if (!cardToDelete) return;
    const deleteCardMutation = useDeleteCardMutation(cardToDelete);
    deleteCardMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Card deleted successfully");
        setOpenDeleteDialog(false);
        setCardToDelete(null);
        queryClient.invalidateQueries({ queryKey: ["cards"] });
      },
      onError: () => {
        toast.error("Failed to delete card");
      },
    });
  };
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Pokémon Cards</h1>
        <Button asChild>
          <Link to="/app/cards/new">Add Card</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="mb-6 flex flex-wrap gap-4">
            <div className="min-w-[200px] flex-1">
              <Input
                name="search"
                placeholder="Search by card name..."
                defaultValue={search.search || ""}
              />
            </div>
            <div className="w-[200px]">
              <Select name="set" defaultValue={search.set || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by set" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Sets</SelectItem>
                  {cardsData.sets?.map((set) => (
                    <SelectItem key={set.cardSetId} value={set.cardSetId}>
                      {set.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[200px]">
              <Select name="rarity" defaultValue={search.rarity || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by rarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Rarities</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="uncommon">Uncommon</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="holo-rare">Holo Rare</SelectItem>
                  <SelectItem value="ultra-rare">Ultra Rare</SelectItem>
                  <SelectItem value="secret-rare">Secret Rare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Filter</Button>
          </form>

          <BasicTable
            columns={columns}
            data={cardsData.cards}
            caption="Your Pokémon card collection."
          />

          <div className="mt-4 flex items-center justify-between">
            <div>
              Showing {cardsData.cards.length} of {cardsData.total} cards
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={search.page <= 1}
                onClick={() =>
                  navigate({
                    to: "/app/cards",
                    search: {
                      ...search,
                      page: search.page - 1,
                    },
                  })
                }
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={search.page * search.pageSize >= cardsData.total}
                onClick={() =>
                  navigate({
                    to: "/app/cards",
                    search: {
                      ...search,
                      page: search.page + 1,
                    },
                  })
                }
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this card? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCard}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
