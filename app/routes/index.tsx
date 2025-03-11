import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: LandingPageComponent,
});
function LandingPageComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-purple-700 p-4 text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Pokémon Card Tracker
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-200">
            An application designed to help Pokémon card collectors catalog and
            manage their collections efficiently.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-bold">Card Cataloging</h2>
              <p className="text-gray-200">
                Catalog your Pokémon cards by entering details such as card
                name, set, rarity, condition, and special attributes. Upload
                images of your cards for visual reference. Search and sort your
                catalog to find specific cards or sets.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-bold">Collection Management</h2>
              <p className="text-gray-200">
                Manage your entire card collection by tracking quantities, trade
                status, and value. Mark cards as 'wanted' or 'for trade', and
                get estimated values based on current market trends. Get
                insights into your collection's total value and completion
                status.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-lg text-gray-200">
            Start organizing your Pokémon card collection today!
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-gray-300">
        <p>
          © {new Date().getFullYear()} Pokémon Card Tracker. All rights
          reserved.
        </p>
        <p className="mt-2">
          Pokémon and its trademarks are ©The Pokémon Company, Nintendo, Game
          Freak, and Creatures Inc. This site is not affiliated with or endorsed
          by these companies.
        </p>
      </footer>
    </div>
  );
}
