import { RouteRecordRaw } from "vue-router";

/**
 * UnAuthorized 401
 */
export const UnAuthorizedRouter: RouteRecordRaw = {
  path: "/401",
  name: "401",
  component: () => import("/@/views/error/401.vue"),
  meta: {
    title: "UnAuthorizedPage",
    hidden: true,
  },
};

/**
 * Forbidden 403
 */
export const ForbiddenRouter: RouteRecordRaw = {
  path: "/403",
  name: "403",
  component: () => import("/@/views/error/403.vue"),
  meta: {
    title: "ForbiddenPage",
    hidden: true,
  },
};

/**
 * 错误页面 500
 */
export const ErrorRouter: RouteRecordRaw = {
  path: "/500",
  name: "500",
  component: () => import("/@/views/error/500.vue"),
  meta: {
    title: "ErrorPage",
    hidden: true,
  },
};

/**
 * 静态路由
 */
export const ErrorRoutes: RouteRecordRaw[] = [
  UnAuthorizedRouter,
  ForbiddenRouter,
  ErrorRouter,
];
