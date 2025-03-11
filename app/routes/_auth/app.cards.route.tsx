import React from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

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

export const Route = createFileRoute("/_auth/app/cards")({
  component: CardsLayoutComponent,
});
function CardsLayoutComponent() {
  const [filterRarity, setFilterRarity] = React.useState<string>("");
  const [filterCondition, setFilterCondition] = React.useState<string>("");
  const [filterTradeStatus, setFilterTradeStatus] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  return (
    <div className="flex flex-col gap-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-2xl font-bold">Pokémon Cards</h1>
            <Button asChild>
              <Link to="/app/cards/new">Add New Card</Link>
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <Input
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Select value={filterRarity} onValueChange={setFilterRarity}>
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

            <div>
              <Select
                value={filterCondition}
                onValueChange={setFilterCondition}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Conditions</SelectItem>
                  <SelectItem value="mint">Mint</SelectItem>
                  <SelectItem value="near-mint">Near Mint</SelectItem>
                  <SelectItem value="light-play">Light Play</SelectItem>
                  <SelectItem value="heavy-play">Heavy Play</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={filterTradeStatus}
                onValueChange={setFilterTradeStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by trade status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="wanted">Wanted</SelectItem>
                  <SelectItem value="for-trade">For Trade</SelectItem>
                  <SelectItem value="not-for-trade">Not For Trade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilterRarity("");
                setFilterCondition("");
                setFilterTradeStatus("");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>

            <Button variant="secondary" size="sm" asChild>
              <Link to="/app/cards">All Cards</Link>
            </Button>

            <Button variant="secondary" size="sm" asChild>
              <Link to="/app/cards" search={{ tradeStatus: "wanted" } as any}>
                Wanted Cards
              </Link>
            </Button>

            <Button variant="secondary" size="sm" asChild>
              <Link
                to="/app/cards"
                search={{ tradeStatus: "for-trade" } as any}
              >
                For Trade
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
