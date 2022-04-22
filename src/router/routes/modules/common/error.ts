import { RouteRecordRaw } from "vue-router";
import { Layout } from "/@/layouts";

/**
 * UnAuthorized 401
 */
const UnAuthorizedRouter: RouteRecordRaw = {
  path: "/401",
  name: "401",
  component: Layout,
  meta: {
    title: "401",
    hidden: true,
  },
  children: [
    {
      path: "/401",
      name: "UnAuthorizedPage",
      component: () => import("/@/views/error/401.vue"),
      meta: {
        title: "401",
        hidden: true,
      },
    },
  ],
};

/**
 * Forbidden 403
 */
const ForbiddenRouter: RouteRecordRaw = {
  path: "/403",
  name: "403",
  component: Layout,
  meta: {
    title: "403",
    hidden: true,
  },
  children: [
    {
      path: "/403",
      name: "403",
      component: () => import("/@/views/error/403.vue"),
      meta: {
        title: "ForbiddenPage",
        hidden: true,
      },
    },
  ],
};

/**
 * 错误页面 500
 */
const ErrorRouter: RouteRecordRaw = {
  path: "/500",
  name: "500",
  component: Layout,
  meta: {
    title: "500",
    hidden: true,
  },
  children: [
    {
      path: "/500",
      name: "500",
      component: () => import("/@/views/error/500.vue"),
      meta: {
        title: "ErrorPage",
        hidden: true,
      },
    },
  ],
};

/**
 * 静态路由
 */
const ErrorRoutes: RouteRecordRaw[] = [
  UnAuthorizedRouter,
  ForbiddenRouter,
  ErrorRouter,
];

export default ErrorRoutes;
