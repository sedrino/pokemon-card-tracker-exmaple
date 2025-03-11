/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.
import { createFileRoute } from "@tanstack/react-router";

// Import Routes
import { Route as rootRoute } from "./routes/__root";
import { Route as AuthImport } from "./routes/_auth";
import { Route as AuthAppCardsCardIdEditImport } from "./routes/_auth/app.cards.$cardId.edit";
import { Route as AuthAppCardsCardIdIndexImport } from "./routes/_auth/app.cards.$cardId.index";
import { Route as AuthAppCardsIndexImport } from "./routes/_auth/app.cards.index";
import { Route as AuthAppCardsNewImport } from "./routes/_auth/app.cards.new";
import { Route as AuthAppCardsRouteImport } from "./routes/_auth/app.cards.route";
import { Route as AuthAppIndexImport } from "./routes/_auth/app.index";
import { Route as AuthAppRouteImport } from "./routes/_auth/app.route";
import { Route as coreAdminImport } from "./routes/(core)/_admin";
import { Route as coreAdminLayoutDefaultImport } from "./routes/(core)/_admin/_layout-default";
import { Route as coreAdminLayoutDefaultAdminUserIdUserSessionsImport } from "./routes/(core)/_admin/_layout-default.admin.$userId.user-sessions";
import { Route as coreAdminLayoutDefaultAdminIndexImport } from "./routes/(core)/_admin/_layout-default.admin.index";
import { Route as coreAdminLayoutDefaultAdminUsersImport } from "./routes/(core)/_admin/_layout-default.admin.users";
import { Route as coreAuthLayoutDefaultImport } from "./routes/(core)/_auth/_layout-default";
import { Route as coreAuthLayoutDefaultAcceptInvitationExampleImport } from "./routes/(core)/_auth/_layout-default.accept-invitation-example";
import { Route as coreAuthLayoutDefaultCreateOrgImport } from "./routes/(core)/_auth/_layout-default.create-org";
import { Route as coreAuthLayoutDefaultTestImport } from "./routes/(core)/_auth/_layout-default.test";
import { Route as coreAuthLayoutDefaultDevPagesImport } from "./routes/(core)/_auth/_layout-default/dev/pages";
import { Route as coreAuthLayoutSettingsImport } from "./routes/(core)/_auth/_layout-settings";
import { Route as coreAuthLayoutSettingsOrganizationIdInviteImport } from "./routes/(core)/_auth/_layout-settings.$organizationId.invite";
import { Route as coreAuthLayoutSettingsOrganizationIdMembersImport } from "./routes/(core)/_auth/_layout-settings.$organizationId.members";
import { Route as coreAuthLayoutSettingsOrganizationIdSettingsImport } from "./routes/(core)/_auth/_layout-settings.$organizationId.settings";
import { Route as coreAcceptInvitationInvitationImport } from "./routes/(core)/accept-invitation.$invitation";
import { Route as coreForgotPasswordImport } from "./routes/(core)/forgot-password";
import { Route as coreLoginImport } from "./routes/(core)/login";
import { Route as coreLogoutImport } from "./routes/(core)/logout";
import { Route as coreRegisterImport } from "./routes/(core)/register";
import { Route as coreResetPasswordImport } from "./routes/(core)/reset-password";
import { Route as ApicoreAuthSplatImport } from "./routes/api/(core)/auth.$";
import { Route as IndexImport } from "./routes/index";

// Create Virtual Routes
const coreImport = createFileRoute("/(core)")();
// Create/Update Routes
const coreRoute = coreImport.update({
  id: "/(core)",
  getParentRoute: () => rootRoute,
} as any);
const AuthRoute = AuthImport.update({
  id: "/_auth",
  getParentRoute: () => rootRoute,
} as any);
const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);
const coreResetPasswordRoute = coreResetPasswordImport.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => coreRoute,
} as any);
const coreRegisterRoute = coreRegisterImport.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => coreRoute,
} as any);
const coreLogoutRoute = coreLogoutImport.update({
  id: "/logout",
  path: "/logout",
  getParentRoute: () => coreRoute,
} as any);
const coreLoginRoute = coreLoginImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => coreRoute,
} as any);
const coreForgotPasswordRoute = coreForgotPasswordImport.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => coreRoute,
} as any);
const coreAdminRoute = coreAdminImport.update({
  id: "/_admin",
  getParentRoute: () => coreRoute,
} as any);
const AuthAppRouteRoute = AuthAppRouteImport.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => AuthRoute,
} as any);
const AuthAppIndexRoute = AuthAppIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthAppRouteRoute,
} as any);
const coreAcceptInvitationInvitationRoute =
  coreAcceptInvitationInvitationImport.update({
    id: "/accept-invitation/$invitation",
    path: "/accept-invitation/$invitation",
    getParentRoute: () => coreRoute,
  } as any);
const coreAuthLayoutSettingsRoute = coreAuthLayoutSettingsImport.update({
  id: "/_auth/_layout-settings",
  getParentRoute: () => coreRoute,
} as any);
const coreAuthLayoutDefaultRoute = coreAuthLayoutDefaultImport.update({
  id: "/_auth/_layout-default",
  getParentRoute: () => coreRoute,
} as any);
const coreAdminLayoutDefaultRoute = coreAdminLayoutDefaultImport.update({
  id: "/_layout-default",
  getParentRoute: () => coreAdminRoute,
} as any);
const AuthAppCardsRouteRoute = AuthAppCardsRouteImport.update({
  id: "/cards",
  path: "/cards",
  getParentRoute: () => AuthAppRouteRoute,
} as any);
const AuthAppCardsIndexRoute = AuthAppCardsIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthAppCardsRouteRoute,
} as any);
const ApicoreAuthSplatRoute = ApicoreAuthSplatImport.update({
  id: "/api/(core)/auth/$",
  path: "/api/auth/$",
  getParentRoute: () => rootRoute,
} as any);
const AuthAppCardsNewRoute = AuthAppCardsNewImport.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => AuthAppCardsRouteRoute,
} as any);
const coreAuthLayoutDefaultTestRoute = coreAuthLayoutDefaultTestImport.update({
  id: "/test",
  path: "/test",
  getParentRoute: () => coreAuthLayoutDefaultRoute,
} as any);
const coreAuthLayoutDefaultCreateOrgRoute =
  coreAuthLayoutDefaultCreateOrgImport.update({
    id: "/create-org",
    path: "/create-org",
    getParentRoute: () => coreAuthLayoutDefaultRoute,
  } as any);
const coreAuthLayoutDefaultAcceptInvitationExampleRoute =
  coreAuthLayoutDefaultAcceptInvitationExampleImport.update({
    id: "/accept-invitation-example",
    path: "/accept-invitation-example",
    getParentRoute: () => coreAuthLayoutDefaultRoute,
  } as any);
const AuthAppCardsCardIdIndexRoute = AuthAppCardsCardIdIndexImport.update({
  id: "/$cardId/",
  path: "/$cardId/",
  getParentRoute: () => AuthAppCardsRouteRoute,
} as any);
const coreAdminLayoutDefaultAdminIndexRoute =
  coreAdminLayoutDefaultAdminIndexImport.update({
    id: "/admin/",
    path: "/admin/",
    getParentRoute: () => coreAdminLayoutDefaultRoute,
  } as any);
const AuthAppCardsCardIdEditRoute = AuthAppCardsCardIdEditImport.update({
  id: "/$cardId/edit",
  path: "/$cardId/edit",
  getParentRoute: () => AuthAppCardsRouteRoute,
} as any);
const coreAuthLayoutSettingsOrganizationIdSettingsRoute =
  coreAuthLayoutSettingsOrganizationIdSettingsImport.update({
    id: "/$organizationId/settings",
    path: "/$organizationId/settings",
    getParentRoute: () => coreAuthLayoutSettingsRoute,
  } as any);
const coreAuthLayoutSettingsOrganizationIdMembersRoute =
  coreAuthLayoutSettingsOrganizationIdMembersImport.update({
    id: "/$organizationId/members",
    path: "/$organizationId/members",
    getParentRoute: () => coreAuthLayoutSettingsRoute,
  } as any);
const coreAuthLayoutSettingsOrganizationIdInviteRoute =
  coreAuthLayoutSettingsOrganizationIdInviteImport.update({
    id: "/$organizationId/invite",
    path: "/$organizationId/invite",
    getParentRoute: () => coreAuthLayoutSettingsRoute,
  } as any);
const coreAuthLayoutDefaultDevPagesRoute =
  coreAuthLayoutDefaultDevPagesImport.update({
    id: "/dev/pages",
    path: "/dev/pages",
    getParentRoute: () => coreAuthLayoutDefaultRoute,
  } as any);
const coreAdminLayoutDefaultAdminUsersRoute =
  coreAdminLayoutDefaultAdminUsersImport.update({
    id: "/admin/users",
    path: "/admin/users",
    getParentRoute: () => coreAdminLayoutDefaultRoute,
  } as any);
const coreAdminLayoutDefaultAdminUserIdUserSessionsRoute =
  coreAdminLayoutDefaultAdminUserIdUserSessionsImport.update({
    id: "/admin/$userId/user-sessions",
    path: "/admin/$userId/user-sessions",
    getParentRoute: () => coreAdminLayoutDefaultRoute,
  } as any);
// Populate the FileRoutesByPath interface
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/_auth": {
      id: "/_auth";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthImport;
      parentRoute: typeof rootRoute;
    };
    "/_auth/app": {
      id: "/_auth/app";
      path: "/app";
      fullPath: "/app";
      preLoaderRoute: typeof AuthAppRouteImport;
      parentRoute: typeof AuthImport;
    };
    "/(core)": {
      id: "/(core)";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof coreImport;
      parentRoute: typeof rootRoute;
    };
    "/(core)/_admin": {
      id: "/(core)/_admin";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof coreAdminImport;
      parentRoute: typeof coreRoute;
    };
    "/(core)/forgot-password": {
      id: "/(core)/forgot-password";
      path: "/forgot-password";
      fullPath: "/forgot-password";
      preLoaderRoute: typeof coreForgotPasswordImport;
      parentRoute: typeof coreImport;
    };
    "/(core)/login": {
      id: "/(core)/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof coreLoginImport;
      parentRoute: typeof coreImport;
    };
    "/(core)/logout": {
      id: "/(core)/logout";
      path: "/logout";
      fullPath: "/logout";
      preLoaderRoute: typeof coreLogoutImport;
      parentRoute: typeof coreImport;
    };
    "/(core)/register": {
      id: "/(core)/register";
      path: "/register";
      fullPath: "/register";
      preLoaderRoute: typeof coreRegisterImport;
      parentRoute: typeof coreImport;
    };
    "/(core)/reset-password": {
      id: "/(core)/reset-password";
      path: "/reset-password";
      fullPath: "/reset-password";
      preLoaderRoute: typeof coreResetPasswordImport;
      parentRoute: typeof coreImport;
    };
    "/_auth/app/cards": {
      id: "/_auth/app/cards";
      path: "/cards";
      fullPath: "/app/cards";
      preLoaderRoute: typeof AuthAppCardsRouteImport;
      parentRoute: typeof AuthAppRouteImport;
    };
    "/(core)/_admin/_layout-default": {
      id: "/(core)/_admin/_layout-default";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof coreAdminLayoutDefaultImport;
      parentRoute: typeof coreAdminImport;
    };
    "/(core)/_auth/_layout-default": {
      id: "/(core)/_auth/_layout-default";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof coreAuthLayoutDefaultImport;
      parentRoute: typeof coreImport;
    };
    "/(core)/_auth/_layout-settings": {
      id: "/(core)/_auth/_layout-settings";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof coreAuthLayoutSettingsImport;
      parentRoute: typeof coreImport;
    };
    "/(core)/accept-invitation/$invitation": {
      id: "/(core)/accept-invitation/$invitation";
      path: "/accept-invitation/$invitation";
      fullPath: "/accept-invitation/$invitation";
      preLoaderRoute: typeof coreAcceptInvitationInvitationImport;
      parentRoute: typeof coreImport;
    };
    "/_auth/app/": {
      id: "/_auth/app/";
      path: "/";
      fullPath: "/app/";
      preLoaderRoute: typeof AuthAppIndexImport;
      parentRoute: typeof AuthAppRouteImport;
    };
    "/(core)/_auth/_layout-default/accept-invitation-example": {
      id: "/(core)/_auth/_layout-default/accept-invitation-example";
      path: "/accept-invitation-example";
      fullPath: "/accept-invitation-example";
      preLoaderRoute: typeof coreAuthLayoutDefaultAcceptInvitationExampleImport;
      parentRoute: typeof coreAuthLayoutDefaultImport;
    };
    "/(core)/_auth/_layout-default/create-org": {
      id: "/(core)/_auth/_layout-default/create-org";
      path: "/create-org";
      fullPath: "/create-org";
      preLoaderRoute: typeof coreAuthLayoutDefaultCreateOrgImport;
      parentRoute: typeof coreAuthLayoutDefaultImport;
    };
    "/(core)/_auth/_layout-default/test": {
      id: "/(core)/_auth/_layout-default/test";
      path: "/test";
      fullPath: "/test";
      preLoaderRoute: typeof coreAuthLayoutDefaultTestImport;
      parentRoute: typeof coreAuthLayoutDefaultImport;
    };
    "/_auth/app/cards/new": {
      id: "/_auth/app/cards/new";
      path: "/new";
      fullPath: "/app/cards/new";
      preLoaderRoute: typeof AuthAppCardsNewImport;
      parentRoute: typeof AuthAppCardsRouteImport;
    };
    "/api/(core)/auth/$": {
      id: "/api/(core)/auth/$";
      path: "/api/auth/$";
      fullPath: "/api/auth/$";
      preLoaderRoute: typeof ApicoreAuthSplatImport;
      parentRoute: typeof rootRoute;
    };
    "/_auth/app/cards/": {
      id: "/_auth/app/cards/";
      path: "/";
      fullPath: "/app/cards/";
      preLoaderRoute: typeof AuthAppCardsIndexImport;
      parentRoute: typeof AuthAppCardsRouteImport;
    };
    "/(core)/_admin/_layout-default/admin/users": {
      id: "/(core)/_admin/_layout-default/admin/users";
      path: "/admin/users";
      fullPath: "/admin/users";
      preLoaderRoute: typeof coreAdminLayoutDefaultAdminUsersImport;
      parentRoute: typeof coreAdminLayoutDefaultImport;
    };
    "/(core)/_auth/_layout-default/dev/pages": {
      id: "/(core)/_auth/_layout-default/dev/pages";
      path: "/dev/pages";
      fullPath: "/dev/pages";
      preLoaderRoute: typeof coreAuthLayoutDefaultDevPagesImport;
      parentRoute: typeof coreAuthLayoutDefaultImport;
    };
    "/(core)/_auth/_layout-settings/$organizationId/invite": {
      id: "/(core)/_auth/_layout-settings/$organizationId/invite";
      path: "/$organizationId/invite";
      fullPath: "/$organizationId/invite";
      preLoaderRoute: typeof coreAuthLayoutSettingsOrganizationIdInviteImport;
      parentRoute: typeof coreAuthLayoutSettingsImport;
    };
    "/(core)/_auth/_layout-settings/$organizationId/members": {
      id: "/(core)/_auth/_layout-settings/$organizationId/members";
      path: "/$organizationId/members";
      fullPath: "/$organizationId/members";
      preLoaderRoute: typeof coreAuthLayoutSettingsOrganizationIdMembersImport;
      parentRoute: typeof coreAuthLayoutSettingsImport;
    };
    "/(core)/_auth/_layout-settings/$organizationId/settings": {
      id: "/(core)/_auth/_layout-settings/$organizationId/settings";
      path: "/$organizationId/settings";
      fullPath: "/$organizationId/settings";
      preLoaderRoute: typeof coreAuthLayoutSettingsOrganizationIdSettingsImport;
      parentRoute: typeof coreAuthLayoutSettingsImport;
    };
    "/_auth/app/cards/$cardId/edit": {
      id: "/_auth/app/cards/$cardId/edit";
      path: "/$cardId/edit";
      fullPath: "/app/cards/$cardId/edit";
      preLoaderRoute: typeof AuthAppCardsCardIdEditImport;
      parentRoute: typeof AuthAppCardsRouteImport;
    };
    "/(core)/_admin/_layout-default/admin/": {
      id: "/(core)/_admin/_layout-default/admin/";
      path: "/admin";
      fullPath: "/admin";
      preLoaderRoute: typeof coreAdminLayoutDefaultAdminIndexImport;
      parentRoute: typeof coreAdminLayoutDefaultImport;
    };
    "/_auth/app/cards/$cardId/": {
      id: "/_auth/app/cards/$cardId/";
      path: "/$cardId";
      fullPath: "/app/cards/$cardId";
      preLoaderRoute: typeof AuthAppCardsCardIdIndexImport;
      parentRoute: typeof AuthAppCardsRouteImport;
    };
    "/(core)/_admin/_layout-default/admin/$userId/user-sessions": {
      id: "/(core)/_admin/_layout-default/admin/$userId/user-sessions";
      path: "/admin/$userId/user-sessions";
      fullPath: "/admin/$userId/user-sessions";
      preLoaderRoute: typeof coreAdminLayoutDefaultAdminUserIdUserSessionsImport;
      parentRoute: typeof coreAdminLayoutDefaultImport;
    };
  }
}
// Create and export the route tree
interface AuthAppCardsRouteRouteChildren {
  AuthAppCardsNewRoute: typeof AuthAppCardsNewRoute;
  AuthAppCardsIndexRoute: typeof AuthAppCardsIndexRoute;
  AuthAppCardsCardIdEditRoute: typeof AuthAppCardsCardIdEditRoute;
  AuthAppCardsCardIdIndexRoute: typeof AuthAppCardsCardIdIndexRoute;
}
const AuthAppCardsRouteRouteChildren: AuthAppCardsRouteRouteChildren = {
  AuthAppCardsNewRoute: AuthAppCardsNewRoute,
  AuthAppCardsIndexRoute: AuthAppCardsIndexRoute,
  AuthAppCardsCardIdEditRoute: AuthAppCardsCardIdEditRoute,
  AuthAppCardsCardIdIndexRoute: AuthAppCardsCardIdIndexRoute,
};
const AuthAppCardsRouteRouteWithChildren =
  AuthAppCardsRouteRoute._addFileChildren(AuthAppCardsRouteRouteChildren);
interface AuthAppRouteRouteChildren {
  AuthAppCardsRouteRoute: typeof AuthAppCardsRouteRouteWithChildren;
  AuthAppIndexRoute: typeof AuthAppIndexRoute;
}
const AuthAppRouteRouteChildren: AuthAppRouteRouteChildren = {
  AuthAppCardsRouteRoute: AuthAppCardsRouteRouteWithChildren,
  AuthAppIndexRoute: AuthAppIndexRoute,
};
const AuthAppRouteRouteWithChildren = AuthAppRouteRoute._addFileChildren(
  AuthAppRouteRouteChildren,
);
interface AuthRouteChildren {
  AuthAppRouteRoute: typeof AuthAppRouteRouteWithChildren;
}
const AuthRouteChildren: AuthRouteChildren = {
  AuthAppRouteRoute: AuthAppRouteRouteWithChildren,
};
const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);
interface coreAdminLayoutDefaultRouteChildren {
  coreAdminLayoutDefaultAdminUsersRoute: typeof coreAdminLayoutDefaultAdminUsersRoute;
  coreAdminLayoutDefaultAdminIndexRoute: typeof coreAdminLayoutDefaultAdminIndexRoute;
  coreAdminLayoutDefaultAdminUserIdUserSessionsRoute: typeof coreAdminLayoutDefaultAdminUserIdUserSessionsRoute;
}
const coreAdminLayoutDefaultRouteChildren: coreAdminLayoutDefaultRouteChildren =
  {
    coreAdminLayoutDefaultAdminUsersRoute:
      coreAdminLayoutDefaultAdminUsersRoute,
    coreAdminLayoutDefaultAdminIndexRoute:
      coreAdminLayoutDefaultAdminIndexRoute,
    coreAdminLayoutDefaultAdminUserIdUserSessionsRoute:
      coreAdminLayoutDefaultAdminUserIdUserSessionsRoute,
  };
const coreAdminLayoutDefaultRouteWithChildren =
  coreAdminLayoutDefaultRoute._addFileChildren(
    coreAdminLayoutDefaultRouteChildren,
  );
interface coreAdminRouteChildren {
  coreAdminLayoutDefaultRoute: typeof coreAdminLayoutDefaultRouteWithChildren;
}
const coreAdminRouteChildren: coreAdminRouteChildren = {
  coreAdminLayoutDefaultRoute: coreAdminLayoutDefaultRouteWithChildren,
};
const coreAdminRouteWithChildren = coreAdminRoute._addFileChildren(
  coreAdminRouteChildren,
);
interface coreAuthLayoutDefaultRouteChildren {
  coreAuthLayoutDefaultAcceptInvitationExampleRoute: typeof coreAuthLayoutDefaultAcceptInvitationExampleRoute;
  coreAuthLayoutDefaultCreateOrgRoute: typeof coreAuthLayoutDefaultCreateOrgRoute;
  coreAuthLayoutDefaultTestRoute: typeof coreAuthLayoutDefaultTestRoute;
  coreAuthLayoutDefaultDevPagesRoute: typeof coreAuthLayoutDefaultDevPagesRoute;
}
const coreAuthLayoutDefaultRouteChildren: coreAuthLayoutDefaultRouteChildren = {
  coreAuthLayoutDefaultAcceptInvitationExampleRoute:
    coreAuthLayoutDefaultAcceptInvitationExampleRoute,
  coreAuthLayoutDefaultCreateOrgRoute: coreAuthLayoutDefaultCreateOrgRoute,
  coreAuthLayoutDefaultTestRoute: coreAuthLayoutDefaultTestRoute,
  coreAuthLayoutDefaultDevPagesRoute: coreAuthLayoutDefaultDevPagesRoute,
};
const coreAuthLayoutDefaultRouteWithChildren =
  coreAuthLayoutDefaultRoute._addFileChildren(
    coreAuthLayoutDefaultRouteChildren,
  );
interface coreAuthLayoutSettingsRouteChildren {
  coreAuthLayoutSettingsOrganizationIdInviteRoute: typeof coreAuthLayoutSettingsOrganizationIdInviteRoute;
  coreAuthLayoutSettingsOrganizationIdMembersRoute: typeof coreAuthLayoutSettingsOrganizationIdMembersRoute;
  coreAuthLayoutSettingsOrganizationIdSettingsRoute: typeof coreAuthLayoutSettingsOrganizationIdSettingsRoute;
}
const coreAuthLayoutSettingsRouteChildren: coreAuthLayoutSettingsRouteChildren =
  {
    coreAuthLayoutSettingsOrganizationIdInviteRoute:
      coreAuthLayoutSettingsOrganizationIdInviteRoute,
    coreAuthLayoutSettingsOrganizationIdMembersRoute:
      coreAuthLayoutSettingsOrganizationIdMembersRoute,
    coreAuthLayoutSettingsOrganizationIdSettingsRoute:
      coreAuthLayoutSettingsOrganizationIdSettingsRoute,
  };
const coreAuthLayoutSettingsRouteWithChildren =
  coreAuthLayoutSettingsRoute._addFileChildren(
    coreAuthLayoutSettingsRouteChildren,
  );
interface coreRouteChildren {
  coreAdminRoute: typeof coreAdminRouteWithChildren;
  coreForgotPasswordRoute: typeof coreForgotPasswordRoute;
  coreLoginRoute: typeof coreLoginRoute;
  coreLogoutRoute: typeof coreLogoutRoute;
  coreRegisterRoute: typeof coreRegisterRoute;
  coreResetPasswordRoute: typeof coreResetPasswordRoute;
  coreAuthLayoutDefaultRoute: typeof coreAuthLayoutDefaultRouteWithChildren;
  coreAuthLayoutSettingsRoute: typeof coreAuthLayoutSettingsRouteWithChildren;
  coreAcceptInvitationInvitationRoute: typeof coreAcceptInvitationInvitationRoute;
}
const coreRouteChildren: coreRouteChildren = {
  coreAdminRoute: coreAdminRouteWithChildren,
  coreForgotPasswordRoute: coreForgotPasswordRoute,
  coreLoginRoute: coreLoginRoute,
  coreLogoutRoute: coreLogoutRoute,
  coreRegisterRoute: coreRegisterRoute,
  coreResetPasswordRoute: coreResetPasswordRoute,
  coreAuthLayoutDefaultRoute: coreAuthLayoutDefaultRouteWithChildren,
  coreAuthLayoutSettingsRoute: coreAuthLayoutSettingsRouteWithChildren,
  coreAcceptInvitationInvitationRoute: coreAcceptInvitationInvitationRoute,
};
const coreRouteWithChildren = coreRoute._addFileChildren(coreRouteChildren);
export interface FileRoutesByFullPath {
  "/": typeof coreAdminRouteWithChildren;
  "": typeof coreAuthLayoutSettingsRouteWithChildren;
  "/app": typeof AuthAppRouteRouteWithChildren;
  "/forgot-password": typeof coreForgotPasswordRoute;
  "/login": typeof coreLoginRoute;
  "/logout": typeof coreLogoutRoute;
  "/register": typeof coreRegisterRoute;
  "/reset-password": typeof coreResetPasswordRoute;
  "/app/cards": typeof AuthAppCardsRouteRouteWithChildren;
  "/accept-invitation/$invitation": typeof coreAcceptInvitationInvitationRoute;
  "/app/": typeof AuthAppIndexRoute;
  "/accept-invitation-example": typeof coreAuthLayoutDefaultAcceptInvitationExampleRoute;
  "/create-org": typeof coreAuthLayoutDefaultCreateOrgRoute;
  "/test": typeof coreAuthLayoutDefaultTestRoute;
  "/app/cards/new": typeof AuthAppCardsNewRoute;
  "/api/auth/$": typeof ApicoreAuthSplatRoute;
  "/app/cards/": typeof AuthAppCardsIndexRoute;
  "/admin/users": typeof coreAdminLayoutDefaultAdminUsersRoute;
  "/dev/pages": typeof coreAuthLayoutDefaultDevPagesRoute;
  "/$organizationId/invite": typeof coreAuthLayoutSettingsOrganizationIdInviteRoute;
  "/$organizationId/members": typeof coreAuthLayoutSettingsOrganizationIdMembersRoute;
  "/$organizationId/settings": typeof coreAuthLayoutSettingsOrganizationIdSettingsRoute;
  "/app/cards/$cardId/edit": typeof AuthAppCardsCardIdEditRoute;
  "/admin": typeof coreAdminLayoutDefaultAdminIndexRoute;
  "/app/cards/$cardId": typeof AuthAppCardsCardIdIndexRoute;
  "/admin/$userId/user-sessions": typeof coreAdminLayoutDefaultAdminUserIdUserSessionsRoute;
}
export interface FileRoutesByTo {
  "/": typeof coreAdminRouteWithChildren;
  "": typeof coreAuthLayoutSettingsRouteWithChildren;
  "/forgot-password": typeof coreForgotPasswordRoute;
  "/login": typeof coreLoginRoute;
  "/logout": typeof coreLogoutRoute;
  "/register": typeof coreRegisterRoute;
  "/reset-password": typeof coreResetPasswordRoute;
  "/accept-invitation/$invitation": typeof coreAcceptInvitationInvitationRoute;
  "/app": typeof AuthAppIndexRoute;
  "/accept-invitation-example": typeof coreAuthLayoutDefaultAcceptInvitationExampleRoute;
  "/create-org": typeof coreAuthLayoutDefaultCreateOrgRoute;
  "/test": typeof coreAuthLayoutDefaultTestRoute;
  "/app/cards/new": typeof AuthAppCardsNewRoute;
  "/api/auth/$": typeof ApicoreAuthSplatRoute;
  "/app/cards": typeof AuthAppCardsIndexRoute;
  "/admin/users": typeof coreAdminLayoutDefaultAdminUsersRoute;
  "/dev/pages": typeof coreAuthLayoutDefaultDevPagesRoute;
  "/$organizationId/invite": typeof coreAuthLayoutSettingsOrganizationIdInviteRoute;
  "/$organizationId/members": typeof coreAuthLayoutSettingsOrganizationIdMembersRoute;
  "/$organizationId/settings": typeof coreAuthLayoutSettingsOrganizationIdSettingsRoute;
  "/app/cards/$cardId/edit": typeof AuthAppCardsCardIdEditRoute;
  "/admin": typeof coreAdminLayoutDefaultAdminIndexRoute;
  "/app/cards/$cardId": typeof AuthAppCardsCardIdIndexRoute;
  "/admin/$userId/user-sessions": typeof coreAdminLayoutDefaultAdminUserIdUserSessionsRoute;
}
export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/_auth": typeof AuthRouteWithChildren;
  "/_auth/app": typeof AuthAppRouteRouteWithChildren;
  "/(core)": typeof coreRouteWithChildren;
  "/(core)/_admin": typeof coreAdminRouteWithChildren;
  "/(core)/forgot-password": typeof coreForgotPasswordRoute;
  "/(core)/login": typeof coreLoginRoute;
  "/(core)/logout": typeof coreLogoutRoute;
  "/(core)/register": typeof coreRegisterRoute;
  "/(core)/reset-password": typeof coreResetPasswordRoute;
  "/_auth/app/cards": typeof AuthAppCardsRouteRouteWithChildren;
  "/(core)/_admin/_layout-default": typeof coreAdminLayoutDefaultRouteWithChildren;
  "/(core)/_auth/_layout-default": typeof coreAuthLayoutDefaultRouteWithChildren;
  "/(core)/_auth/_layout-settings": typeof coreAuthLayoutSettingsRouteWithChildren;
  "/(core)/accept-invitation/$invitation": typeof coreAcceptInvitationInvitationRoute;
  "/_auth/app/": typeof AuthAppIndexRoute;
  "/(core)/_auth/_layout-default/accept-invitation-example": typeof coreAuthLayoutDefaultAcceptInvitationExampleRoute;
  "/(core)/_auth/_layout-default/create-org": typeof coreAuthLayoutDefaultCreateOrgRoute;
  "/(core)/_auth/_layout-default/test": typeof coreAuthLayoutDefaultTestRoute;
  "/_auth/app/cards/new": typeof AuthAppCardsNewRoute;
  "/api/(core)/auth/$": typeof ApicoreAuthSplatRoute;
  "/_auth/app/cards/": typeof AuthAppCardsIndexRoute;
  "/(core)/_admin/_layout-default/admin/users": typeof coreAdminLayoutDefaultAdminUsersRoute;
  "/(core)/_auth/_layout-default/dev/pages": typeof coreAuthLayoutDefaultDevPagesRoute;
  "/(core)/_auth/_layout-settings/$organizationId/invite": typeof coreAuthLayoutSettingsOrganizationIdInviteRoute;
  "/(core)/_auth/_layout-settings/$organizationId/members": typeof coreAuthLayoutSettingsOrganizationIdMembersRoute;
  "/(core)/_auth/_layout-settings/$organizationId/settings": typeof coreAuthLayoutSettingsOrganizationIdSettingsRoute;
  "/_auth/app/cards/$cardId/edit": typeof AuthAppCardsCardIdEditRoute;
  "/(core)/_admin/_layout-default/admin/": typeof coreAdminLayoutDefaultAdminIndexRoute;
  "/_auth/app/cards/$cardId/": typeof AuthAppCardsCardIdIndexRoute;
  "/(core)/_admin/_layout-default/admin/$userId/user-sessions": typeof coreAdminLayoutDefaultAdminUserIdUserSessionsRoute;
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | ""
    | "/app"
    | "/forgot-password"
    | "/login"
    | "/logout"
    | "/register"
    | "/reset-password"
    | "/app/cards"
    | "/accept-invitation/$invitation"
    | "/app/"
    | "/accept-invitation-example"
    | "/create-org"
    | "/test"
    | "/app/cards/new"
    | "/api/auth/$"
    | "/app/cards/"
    | "/admin/users"
    | "/dev/pages"
    | "/$organizationId/invite"
    | "/$organizationId/members"
    | "/$organizationId/settings"
    | "/app/cards/$cardId/edit"
    | "/admin"
    | "/app/cards/$cardId"
    | "/admin/$userId/user-sessions";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | ""
    | "/forgot-password"
    | "/login"
    | "/logout"
    | "/register"
    | "/reset-password"
    | "/accept-invitation/$invitation"
    | "/app"
    | "/accept-invitation-example"
    | "/create-org"
    | "/test"
    | "/app/cards/new"
    | "/api/auth/$"
    | "/app/cards"
    | "/admin/users"
    | "/dev/pages"
    | "/$organizationId/invite"
    | "/$organizationId/members"
    | "/$organizationId/settings"
    | "/app/cards/$cardId/edit"
    | "/admin"
    | "/app/cards/$cardId"
    | "/admin/$userId/user-sessions";
  id:
    | "__root__"
    | "/"
    | "/_auth"
    | "/_auth/app"
    | "/(core)"
    | "/(core)/_admin"
    | "/(core)/forgot-password"
    | "/(core)/login"
    | "/(core)/logout"
    | "/(core)/register"
    | "/(core)/reset-password"
    | "/_auth/app/cards"
    | "/(core)/_admin/_layout-default"
    | "/(core)/_auth/_layout-default"
    | "/(core)/_auth/_layout-settings"
    | "/(core)/accept-invitation/$invitation"
    | "/_auth/app/"
    | "/(core)/_auth/_layout-default/accept-invitation-example"
    | "/(core)/_auth/_layout-default/create-org"
    | "/(core)/_auth/_layout-default/test"
    | "/_auth/app/cards/new"
    | "/api/(core)/auth/$"
    | "/_auth/app/cards/"
    | "/(core)/_admin/_layout-default/admin/users"
    | "/(core)/_auth/_layout-default/dev/pages"
    | "/(core)/_auth/_layout-settings/$organizationId/invite"
    | "/(core)/_auth/_layout-settings/$organizationId/members"
    | "/(core)/_auth/_layout-settings/$organizationId/settings"
    | "/_auth/app/cards/$cardId/edit"
    | "/(core)/_admin/_layout-default/admin/"
    | "/_auth/app/cards/$cardId/"
    | "/(core)/_admin/_layout-default/admin/$userId/user-sessions";
  fileRoutesById: FileRoutesById;
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AuthRoute: typeof AuthRouteWithChildren;
  coreRoute: typeof coreRouteWithChildren;
  ApicoreAuthSplatRoute: typeof ApicoreAuthSplatRoute;
}
const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  coreRoute: coreRouteWithChildren,
  ApicoreAuthSplatRoute: ApicoreAuthSplatRoute,
};
export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();
