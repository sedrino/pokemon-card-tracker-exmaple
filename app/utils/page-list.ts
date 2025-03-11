export const pageDescriptions: {
  description: string;
  path: string;
}[] = [
  {
    description:
      "This route serves as the public landing page for the Pokémon Card Tracker. It displays a prominent application name, a succinct overview of its features, and a primary call-to-action prompting users to log in or sign up. The page has a visually appealing Pokémon-themed design and includes basic navigation or links if needed. There are no authenticated features on this page.",
    path: "index",
  },
  {
    description:
      "This is the main authenticated layout route for the application. It is accessible only to logged-in users. It provides a persistent left-hand sidebar navigation with links to the dashboard (collection overview) and card management sections. A top bar may display the user’s session info or app branding. It contains an <Outlet /> that renders all child routes under /app.",
    path: "_auth/app.route",
  },
  {
    description:
      "The primary dashboard for authenticated users, presenting an at-a-glance summary of the user’s Pokémon card collection. It displays the total number of cards cataloged, the number of completed sets, and the overall collection value. Additional quick stats or charts may appear, such as a pie chart of card rarities or a progress bar for each set. Users can click through to the cards list or specific sets, but no table or form is present on this page.",
    path: "_auth/app.index",
  },
  {
    description:
      "A layout route grouping all card-related views under /app/cards. It includes an <Outlet /> to render child routes: listing, creation, and details. The sidebar from the parent layout remains visible, but this route may also add a sub-navigation bar for card-specific filters if needed.",
    path: "_auth/app.cards.route",
  },
  {
    description:
      "The listing of all Pokémon cards owned by the user. This page displays a searchable, sortable table of cards with the following columns: • Card Name (clickable to view details). • Set. • Rarity. • Condition. • Quantity owned. • Trade Status (Wanted, For Trade, or Not for Trade). • Estimated Value. • Row Actions (View, Edit, Delete). Users can filter by card name, set, or rarity. An 'Add Card' button navigates to the New Card page (/app/cards/new). Deletion is confirmed in a dialog; on acceptance, the card is removed from the list.",
    path: "_auth/app.cards.index",
  },
  {
    description:
      "A dedicated page for creating a new card entry. The form includes fields for: • Card Name (required). • Set (required). • Rarity (common, uncommon, rare, etc.). • Condition (e.g., Mint, Near Mint). • Special Attributes (e.g., holographic, first edition). • Quantity. • Trade Status (Wanted, For Trade, Not for Trade). • Estimated Value. • An image uploader for front/back scans. On successful form submission, the app saves the card to the catalog and redirects to the card listing or detail page.",
    path: "_auth/app.cards.new",
  },
  {
    description:
      "A detail page for a single Pokémon card. It displays all card properties: name, set, rarity, condition, special attributes, quantity, trade status, and estimated value. A card image is prominently featured, with support for multiple uploaded images if provided. An 'Edit' button allows navigation to the Edit Card page (/app/cards/:cardId/edit). A 'Delete' button triggers a confirmation dialog, and on confirmation, the card is removed and the user is returned to the listing. Users can also toggle the trade/wanted status here.",
    path: "_auth/app.cards.$cardId.index",
  },
  {
    description:
      "A form page for updating an existing card’s information. It includes the same fields as the New Card page (name, set, rarity, condition, special attributes, trade status, value, and images). Users can replace or remove card images. Clicking 'Save' updates the card record and navigates back to the card detail page. A 'Cancel' button discards any changes and returns to the detail view without saving.",
    path: "_auth/app.cards.$cardId.edit",
  },
] as const;
