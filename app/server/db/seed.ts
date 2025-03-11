import { faker } from "@faker-js/faker";

import {
  addOrganizationMember,
  createOrganization,
  createUser,
} from "@/lib/auth";

import { db } from "./connection";
import {
  CardCondition,
  CardRarity,
  CardTradeStatus,
  tableCard,
  tableCardSet,
} from "./schema";

export async function seed() {
  const devUser = await createUser("dev@example.com", "Dev User", "password");
  const devOrg = await createOrganization("Dev Organization");
  if (!devOrg) {
    throw new Error("Failed to create organization");
  }
  await addOrganizationMember(devOrg.id, devUser.id, "admin");
  const cardSetInsertData = [
    {
      name: `${faker.commerce.productAdjective()} Base Set`,
      createdAt: faker.date.past().getTime(),
      updatedAt: faker.date.recent().getTime(),
    },
    {
      name: `${faker.commerce.productAdjective()} Jungle`,
      createdAt: faker.date.past().getTime(),
      updatedAt: faker.date.recent().getTime(),
    },
    {
      name: `${faker.commerce.productAdjective()} Fossil`,
      createdAt: faker.date.past().getTime(),
      updatedAt: faker.date.recent().getTime(),
    },
  ];
  const cardSets = await db
    .insert(tableCardSet)
    .values(cardSetInsertData)
    .returning();
  const cardInserts = Array.from({ length: 10 }).map(() => {
    const randomRarity = faker.helpers.arrayElement<CardRarity>([
      "common",
      "uncommon",
      "rare",
      "holo-rare",
      "ultra-rare",
      "secret-rare",
    ]);
    const randomCondition = faker.helpers.arrayElement<CardCondition>([
      "mint",
      "near-mint",
      "light-play",
      "heavy-play",
      "damaged",
    ]);
    const randomTradeStatus = faker.helpers.arrayElement<CardTradeStatus>([
      "wanted",
      "for-trade",
      "not-for-trade",
    ]);
    const randomSet = faker.helpers.arrayElement(cardSets);
    return {
      userId: devUser.id,
      cardSetId: randomSet.cardSetId,
      cardName: faker.commerce.productName(),
      rarity: randomRarity,
      condition: randomCondition,
      specialAttributes: faker.helpers.arrayElements(
        ["Foil", "Signed", "Error", "First Edition", "Alternate Holo"],
        { min: 0, max: 2 },
      ),
      quantity: faker.number.int({ min: 1, max: 20 }),
      tradeStatus: randomTradeStatus,
      estimatedValue: parseFloat(faker.commerce.price({ min: 0, max: 200 })),
      images: [
        faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
        faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      ],
      createdAt: faker.date.past().getTime(),
      updatedAt: faker.date.recent().getTime(),
    };
  });
  await db.insert(tableCard).values(cardInserts).returning();
}
await seed();
