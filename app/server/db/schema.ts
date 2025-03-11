import { ulid } from "@std/ulid";
import {
  AnySQLiteColumn,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { unixNow } from "@/lib/utils/time";

import { createTableColumnsEnum } from "./util";

export const tableUser = sqliteTable("user", {
  userId: text("user_id")
    .primaryKey()
    .$default(() => `u-${ulid()}`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  role: text("role").notNull().default("user"),
  banned: integer("banned", { mode: "boolean" }).notNull().default(false),
  banReason: text("ban_reason"),
  banExpires: integer("ban_expires", { mode: "number" }),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export const tableSession = sqliteTable("session", {
  sessionId: text("session_id")
    .primaryKey()
    .$default(() => `s-${ulid()}`),
  userId: text("user_id")
    .notNull()
    .references((): AnySQLiteColumn => tableUser.userId),
  expiresAt: integer("expires_at", { mode: "number" }),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  activeOrganizationId: text("active_organization_id"),
  impersonatedBy: text("impersonated_by"),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export const tableUserRole = sqliteTable("user_role", {
  userRoleId: text("user_role_id")
    .primaryKey()
    .$default(() => `ur-${ulid()}`),
  userId: text("user_id")
    .notNull()
    .references((): AnySQLiteColumn => tableUser.userId),
  role: text("role").notNull(),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export const tableAccount = sqliteTable("account", {
  id: text("id")
    .primaryKey()
    .$default(() => `a-${ulid()}`),
  accountId: text("account_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references((): AnySQLiteColumn => tableUser.userId),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "number" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "number",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }).notNull(),
});
export const tableVerification = sqliteTable("verification", {
  verificationId: text("verification_id")
    .primaryKey()
    .$default(() => `v-${ulid()}`),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "number" }).notNull(),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export const tableOrganization = sqliteTable("organization", {
  organizationId: text("organization_id")
    .primaryKey()
    .$default(() => `o-${ulid()}`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique("slug_unq"),
  logo: text("logo"),
  metadata: text("metadata"),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export const tableMember = sqliteTable("member", {
  memberId: text("member_id")
    .primaryKey()
    .$default(() => `m-${ulid()}`),
  organizationId: text("organization_id")
    .notNull()
    .references((): AnySQLiteColumn => tableOrganization.organizationId),
  userId: text("user_id")
    .notNull()
    .references((): AnySQLiteColumn => tableUser.userId),
  role: text("role").notNull(),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export const tableInvitation = sqliteTable("invitation", {
  invitationId: text("invitation_id")
    .primaryKey()
    .$default(() => `i-${ulid()}`),
  organizationId: text("organization_id")
    .notNull()
    .references((): AnySQLiteColumn => tableOrganization.organizationId),
  email: text("email").notNull(),
  role: text("role"),
  status: text("status").notNull(),
  expiresAt: integer("expires_at", { mode: "number" }).notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references((): AnySQLiteColumn => tableUser.userId),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export const tableCardSet = sqliteTable("card_set", {
  cardSetId: text("card_set_id")
    .primaryKey()
    .$default(() => `cs-${ulid()}`),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export type CardRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "holo-rare"
  | "ultra-rare"
  | "secret-rare";
export type CardCondition =
  | "mint"
  | "near-mint"
  | "light-play"
  | "heavy-play"
  | "damaged";
export type CardTradeStatus = "wanted" | "for-trade" | "not-for-trade";
export const tableCard = sqliteTable("card", {
  cardId: text("card_id")
    .primaryKey()
    .$default(() => `c-${ulid()}`),
  userId: text("user_id")
    .notNull()
    .references((): AnySQLiteColumn => tableUser.userId),
  cardSetId: text("card_set_id")
    .notNull()
    .references((): AnySQLiteColumn => tableCardSet.cardSetId),
  cardName: text("card_name").notNull(),
  rarity: text("rarity").notNull().$type<CardRarity>().default("common"),
  condition: text("condition")
    .notNull()
    .$type<CardCondition>()
    .default("near-mint"),
  specialAttributes: text("special_attributes", { mode: "json" }).$type<
    string[]
  >(),
  quantity: integer("quantity", { mode: "number" }).notNull(),
  tradeStatus: text("trade_status")
    .notNull()
    .$type<CardTradeStatus>()
    .default("not-for-trade"),
  estimatedValue: real("estimated_value").notNull(),
  images: text("images", { mode: "json" }).$type<string[]>(),
  createdAt: integer("created_at", { mode: "number" })
    .notNull()
    .$defaultFn(() => unixNow()),
  updatedAt: integer("updated_at", { mode: "number" })
    .$defaultFn(() => unixNow())
    .$onUpdate(() => unixNow()),
  deletedAt: integer("deleted_at", { mode: "number" }),
});
export type UserInsert = typeof tableUser.$inferInsert;
export type UserUpdate = Partial<typeof tableUser.$inferSelect>;
export type UserSelect = typeof tableUser.$inferSelect;
export const UserColumns = createTableColumnsEnum(tableUser);
export type SessionInsert = typeof tableSession.$inferInsert;
export type SessionUpdate = Partial<typeof tableSession.$inferSelect>;
export type SessionSelect = typeof tableSession.$inferSelect;
export const SessionColumns = createTableColumnsEnum(tableSession);
export type UserRoleInsert = typeof tableUserRole.$inferInsert;
export type UserRoleUpdate = Partial<typeof tableUserRole.$inferSelect>;
export type UserRoleSelect = typeof tableUserRole.$inferSelect;
export const UserRoleColumns = createTableColumnsEnum(tableUserRole);
export type AccountInsert = typeof tableAccount.$inferInsert;
export type AccountUpdate = Partial<typeof tableAccount.$inferSelect>;
export type AccountSelect = typeof tableAccount.$inferSelect;
export const AccountColumns = createTableColumnsEnum(tableAccount);
export type VerificationInsert = typeof tableVerification.$inferInsert;
export type VerificationUpdate = Partial<typeof tableVerification.$inferSelect>;
export type VerificationSelect = typeof tableVerification.$inferSelect;
export const VerificationColumns = createTableColumnsEnum(tableVerification);
export type OrganizationInsert = typeof tableOrganization.$inferInsert;
export type OrganizationUpdate = Partial<typeof tableOrganization.$inferSelect>;
export type OrganizationSelect = typeof tableOrganization.$inferSelect;
export const OrganizationColumns = createTableColumnsEnum(tableOrganization);
export type MemberInsert = typeof tableMember.$inferInsert;
export type MemberUpdate = Partial<typeof tableMember.$inferSelect>;
export type MemberSelect = typeof tableMember.$inferSelect;
export const MemberColumns = createTableColumnsEnum(tableMember);
export type InvitationInsert = typeof tableInvitation.$inferInsert;
export type InvitationUpdate = Partial<typeof tableInvitation.$inferSelect>;
export type InvitationSelect = typeof tableInvitation.$inferSelect;
export const InvitationColumns = createTableColumnsEnum(tableInvitation);
export type CardSetInsert = typeof tableCardSet.$inferInsert;
export type CardSetUpdate = Partial<typeof tableCardSet.$inferSelect>;
export type CardSetSelect = typeof tableCardSet.$inferSelect;
export const CardSetColumns = createTableColumnsEnum(tableCardSet);
export type CardInsert = typeof tableCard.$inferInsert;
export type CardUpdate = Partial<typeof tableCard.$inferSelect>;
export type CardSelect = typeof tableCard.$inferSelect;
export const CardColumns = createTableColumnsEnum(tableCard);
