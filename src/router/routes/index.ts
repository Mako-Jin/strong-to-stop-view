import type { RouteRecordRaw } from "vue-router";
import ErrorRoutes from "./modules/common/error";
import DefaultHomeRouter from "./modules/common/home";
import { PageEnum } from "/@/enums/PageEnums";
import { Layout } from "/@/layouts";

/**
 * 首页
 */
export const HomeRouter: RouteRecordRaw = {
  path: "/",
  name: "Index",
  redirect: PageEnum.DEFAULT_HOME,
  meta: {
    title: "首页",
    hidden: true,
  },
};

/**
 * 登录页
 */
export const LoginRouter: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/login/index.vue"),
  meta: {
    title: "登录页",
    hidden: true,
  },
};

/**
 * 页面找不到找不到 404
 */
export const PageNotFoundRouter: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "PageNotFound",
  component: Layout,
  meta: {
    title: "404",
    hidden: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "PageNotFound",
      component: () => import("/@/views/error/404.vue"),
      meta: {
        title: "404",
        hidden: true,
      },
    },
  ],
};

/**
 * 静态路由
 */
export const routes: RouteRecordRaw[] = [
  LoginRouter,
  HomeRouter,
  DefaultHomeRouter,
  ...ErrorRoutes,
  PageNotFoundRouter,
];

const modules = import.meta.globEager("./**/*.ts");

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

/**
 * 动态路由
 */
export const asyncRoutes: RouteRecordRaw[] = [
  ...routeModuleList,
  PageNotFoundRouter,
];
