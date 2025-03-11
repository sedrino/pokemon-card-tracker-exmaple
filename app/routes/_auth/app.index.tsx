import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Cell, Pie, PieChart } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { formatDate } from "@/lib/utils";
import { dashboardStatsOptions } from "@/query/options/card";

export const Route = createFileRoute("/_auth/app/")({
  component: DashboardComponent,
  loader: (opts) => {
    return opts.context.queryClient.ensureQueryData(dashboardStatsOptions());
  },
});
function DashboardComponent() {
  const { data: dashboardData } = useSuspenseQuery(dashboardStatsOptions());
  const rarityChartData = React.useMemo(() => {
    return dashboardData.rarityDistribution.map((item) => ({
      name: item.rarity,
      value: item.count,
    }));
  }, [dashboardData.rarityDistribution]);
  const rarityChartConfig = {
    value: {
      label: "Cards",
      color: "#2563eb",
    },
  } as ChartConfig;
  const setCompletionChartConfig = {
    completed: {
      label: "Completed",
      color: "#2563eb",
    },
    remaining: {
      label: "Remaining",
      color: "#e5e7eb",
    },
  } as ChartConfig;
  const RARITY_COLORS = {
    common: "#A8A8A8",
    uncommon: "#4CAF50",
    rare: "#2196F3",
    "holo-rare": "#9C27B0",
    "ultra-rare": "#FF9800",
    "secret-rare": "#F44336",
  };
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Collection Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Pokémon card collection
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCards}</div>
            <p className="text-xs text-muted-foreground">
              Last added on{" "}
              {formatDate(
                dashboardData.lastCardAddedDate instanceof Date
                  ? Math.floor(dashboardData.lastCardAddedDate.getTime() / 1000)
                  : dashboardData.lastCardAddedDate,
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Sets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.completedSets} / {dashboardData.totalSets}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (dashboardData.completedSets / dashboardData.totalSets) * 100,
              )}
              % completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Collection Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Number(dashboardData.totalValue).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average card value: $
              {(
                Number(dashboardData.totalValue) / dashboardData.totalCards
              ).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card Rarity Distribution</CardTitle>
            <CardDescription>
              Breakdown of your collection by rarity
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-[300px]">
              <PieChart width={300} height={300}>
                <Pie
                  data={rarityChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {rarityChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        RARITY_COLORS[
                          entry.name as keyof typeof RARITY_COLORS
                        ] || "#8884d8"
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trade Status</CardTitle>
            <CardDescription>Cards by trade status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Wanted</p>
                  <p className="text-xs text-muted-foreground">
                    Cards you're looking to acquire
                  </p>
                </div>
                <div className="text-2xl font-bold">
                  {dashboardData.tradeStatusCounts.wanted}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">For Trade</p>
                  <p className="text-xs text-muted-foreground">
                    Cards available for trading
                  </p>
                </div>
                <div className="text-2xl font-bold">
                  {dashboardData.tradeStatusCounts.forTrade}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Not For Trade</p>
                  <p className="text-xs text-muted-foreground">
                    Cards you're keeping
                  </p>
                </div>
                <div className="text-2xl font-bold">
                  {dashboardData.tradeStatusCounts.notForTrade}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest collection updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.cardName} • {formatDate(activity.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link to="/app/cards">View All Cards</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/app/cards/new">Add New Card</Link>
        </Button>
      </div>
    </div>
  );
}
