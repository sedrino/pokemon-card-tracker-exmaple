import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

import { appConfig } from "@/config";
import { db } from "@/server/db/connection";
import {
  sendOrganizationInvitation,
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/server/email";

import { unixNow } from "./utils/time";

const baseSchema = {
  user: sqliteTable("user", {
    id: text("user_id")
      .primaryKey()
      .$defaultFn(() => `u-${ulid()}`),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
    image: text("image"),
    role: text("role").default("user"),
    banned: integer("banned", { mode: "boolean" }).default(false),
    banReason: text("ban_reason"),
    banExpires: integer("ban_expires", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  }),
  session: sqliteTable("session", {
    id: text("session_id")
      .primaryKey()
      .$defaultFn(() => `s-${ulid()}`),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id"),
    activeOrganizationId: text("active_organization_id"),
    impersonatedBy: text("impersonated_by"),
  }),
  account: sqliteTable("account", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => `a-${ulid()}`),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
      mode: "timestamp",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
      mode: "timestamp",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  }),
  verification: sqliteTable("verification", {
    id: text("verification_id")
      .primaryKey()
      .$defaultFn(() => `v-${ulid()}`),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
  }),
};
const organizationSchema = {
  organization: sqliteTable("organization", {
    id: text("organization_id")
      .primaryKey()
      .$defaultFn(() => `o-${ulid()}`),
    name: text("name").notNull(),
    slug: text("slug").unique(),
    logo: text("logo"),
    createdAt: integer("created_at")
      .notNull()
      .$defaultFn(() => unixNow()),
    metadata: text("metadata"),
  }),
  member: sqliteTable("member", {
    id: text("member_id")
      .primaryKey()
      .$defaultFn(() => `m-${ulid()}`),
    organizationId: text("organization_id").notNull(),
    userId: text("user_id").notNull(),
    role: text("role").notNull(),
    createdAt: integer("created_at")
      .notNull()
      .$defaultFn(() => unixNow()),
  }),
  invitation: sqliteTable("invitation", {
    id: text("invitation_id")
      .primaryKey()
      .$defaultFn(() => `i-${ulid()}`),
    organizationId: text("organization_id").notNull(),
    email: text("email").notNull(),
    role: text("role"),
    status: text("status").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    inviterId: text("inviter_id").notNull(),
  }),
};
const authSchema = appConfig.organizations
  ? { ...baseSchema, organizationSchema }
  : baseSchema;
const basePlugins = [admin(), organization()];
const organizationPlugins = appConfig.organizations
  ? [
      organization({
        async sendInvitationEmail(data) {
          const inviteLink = `/accept-invitation/${data.id}`;
          sendOrganizationInvitation({
            email: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            organizationName: data.organization.name,
            inviteLink,
          });
        },
      }),
    ]
  : [];
const plugins = [...basePlugins, ...organizationPlugins];
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: baseSchema.user,
      session: baseSchema.session,
      account: baseSchema.account,
      verification: baseSchema.verification,
      organization: organizationSchema.organization,
      member: organizationSchema.member,
      invitation: organizationSchema.invitation,
    },
  }),
  plugins: [...basePlugins, ...organizationPlugins],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendPasswordResetEmail(user.email, url);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendVerificationEmail(user.email, url);
    },
  },
  advanced: {
    generateId: (options: { model: string; size?: number }) => {
      if (options.model === "organization") {
        return `o-${ulid()}`;
      }
      if (options.model === "user") {
        return `u-${ulid()}`;
      }
      if (options.model === "member") {
        return `m-${ulid()}`;
      }
      if (options.model === "invitation") {
        return `i-${ulid()}`;
      }
      if (options.model === "verification") {
        return `v-${ulid()}`;
      }
      return ulid();
    },
  },
});
export async function createUser(
  email: string,
  name: string,
  password: string,
) {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      name,
      password,
      role: "user",
    },
  });
  return result.user;
}
export async function createOrganization(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const [organization] = await db
    .insert(organizationSchema.organization)
    .values({
      name,
      slug,
    })
    .returning();
  return organization;
}
export async function addOrganizationMember(
  organizationId: string,
  userId: string,
  role: "admin" | "member",
) {
  const [member] = await db
    .insert(organizationSchema.member)
    .values({
      organizationId,
      userId,
      role,
    })
    .returning();
  return member;
}
