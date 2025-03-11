import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, setCookie } from "@tanstack/react-start/server";
import { Session, User } from "better-auth";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { authMiddleware } from "@/middleware/auth";

export const $getSessionAndUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    const session = await auth.api.getSession({
      headers: webRequest.headers,
    });
    let organization = null;
    if (session?.session) {
      organization = await auth.api.getFullOrganization({
        headers: webRequest.headers,
      });
    }
    return {
      session: session?.session as Session | null,
      user: session?.user as User | null,
      organization: organization as any | null, // TODO: fix this type
    };
  },
);
export const $signUp = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1),
      email: z.string().min(1),
      password: z.string().min(1),
      callbackURL: z.string().min(1),
    }),
  )
  .handler(async ({ context, data }) => {
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    await auth.api.signUpEmail({
      headers: webRequest.headers,
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: data.callbackURL,
      },
    });
  });
export const $forgetPassword = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().min(1),
      redirectTo: z.string().min(1),
    }),
  )
  .handler(async ({ context, data }) => {
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    await auth.api.forgetPassword({
      headers: webRequest.headers,
      body: {
        email: data.email,
        redirectTo: "/reset-password",
      },
    });
  });
export const $resetPassword = createServerFn({ method: "POST" })
  .validator(
    z.object({
      newPassword: z.string().min(1),
      token: z.string().min(1),
    }),
  )
  .handler(async ({ context, data }) => {
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    await auth.api.resetPassword({
      headers: webRequest.headers,
      body: {
        newPassword: data.newPassword,
        token: data.token,
      },
    });
  });
export const $signIn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().min(1),
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const request = getWebRequest();
    if (!request?.headers) {
      return null;
    }
    console.log("Sign in attempt for email:", data.email);
    console.log("Calling auth.api.signInEmail...");
    try {
      const response = await auth.api.signInEmail({
        body: {
          email: data.email,
          password: data.password,
        },
        headers: request.headers,
        asResponse: true,
      });
      console.log("Sign in response status:", response.status);
      const sessionToken = response.headers.get("set-cookie");
      console.log(
        "Session token in headers:",
        sessionToken ? "Present" : "Missing",
      );
      if (sessionToken) {
        console.log("Raw session token:", sessionToken);
        const sessionTokenCookie = sessionToken.split(";")[0];
        console.log("Session token cookie part:", sessionTokenCookie);
        const sessionTokenValue = sessionTokenCookie.split("=")[1];
        console.log(
          "Session token value:",
          sessionTokenValue
            ? sessionTokenValue.substring(0, 10) + "..."
            : "Invalid format",
        );
        console.log("Setting cookie in response...");
        setCookie("better-auth.session_token", sessionTokenValue, {
          httpOnly: true,
          secure: true,
        });
        console.log("Cookie set successfully");
      } else {
        console.warn("No session token found in response headers");
      }
      console.log("Sign in completed successfully");
      return response;
    } catch (error) {
      console.error("Sign in error:", error);
      console.error(
        "Error details:",
        error instanceof Error ? error.message : String(error),
      );
      throw error;
    }
  });
export const $signOut = createServerFn({ method: "POST" }).handler(
  async ({ context, data }) => {
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    await auth.api.signOut({
      headers: webRequest.headers,
    });
  },
);
/** ORG */
export const $getUsersOrganizations = createServerFn({ method: "GET" }).handler(
  async () => {
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    const organizations = await auth.api.listOrganizations({
      headers: webRequest.headers,
    });
    return organizations;
  },
);
export const $setActiveOrganization = createServerFn({ method: "POST" })
  .validator(z.object({ organizationId: z.string().nullable() }))
  .handler(async ({ data }) => {
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    const organization = await auth.api.setActiveOrganization({
      headers: webRequest.headers,
      body: {
        organizationId: data.organizationId,
      },
    });
    return organization;
  });
export const $getActiveOrganization = createServerFn({ method: "GET" }).handler(
  async () => {
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    const organization = await auth.api.getFullOrganization({
      headers: webRequest.headers,
    });
    return organization;
  },
);
export const $getActiveOrganizationMembers = createServerFn({
  method: "GET",
}).handler(async () => {
  const webRequest = getWebRequest();
  if (!webRequest?.headers) {
    throw new Error("No headers");
  }
  const activeOrganization = await auth.api.getFullOrganization({
    headers: webRequest.headers,
  });
  if (!activeOrganization) {
    throw new Error("Active organization not found");
  }
  type MemberInfo = {
    id: string;
    organizationId: string;
    email: string;
    role: string;
    status: string;
    createdAt?: Date;
    user?: any;
    expiresAt?: Date;
    inviterId?: string;
  };
  const emailMap = new Map<string, MemberInfo>();
  for (const member of activeOrganization.members) {
    emailMap.set(member.user.email, {
      id: member.id,
      organizationId: member.organizationId,
      email: member.user.email,
      role: member.role,
      status: "active",
      createdAt: member.createdAt,
      user: member.user,
    });
  }
  for (const invitation of activeOrganization.invitations) {
    const existingEntry = emailMap.get(invitation.email);
    if (
      !existingEntry ||
      (invitation.expiresAt &&
        (!existingEntry.expiresAt ||
          invitation.expiresAt > existingEntry.expiresAt) &&
        existingEntry.status !== "active")
    ) {
      emailMap.set(invitation.email, {
        id: invitation.id,
        organizationId: invitation.organizationId,
        email: invitation.email,
        role: invitation.role,
        status: invitation.status,
        inviterId: invitation.inviterId,
        expiresAt: invitation.expiresAt,
      });
    }
  }
  const members = Array.from(emailMap.values());
  return members;
});
export const $getUserRoleForOrganization = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const userId = context.userId;
    const webRequest = getWebRequest();
    if (!webRequest?.headers) {
      throw new Error("No headers");
    }
    const organization = await auth.api.getFullOrganization({
      headers: webRequest.headers,
    });
    if (!organization) {
      return null;
    }
    const member = organization.members.find(
      (member) => member.userId === userId,
    );
    if (!member) {
      return null;
    }
    return member.role;
  });
