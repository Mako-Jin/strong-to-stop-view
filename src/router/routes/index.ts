import type { RouteRecordRaw } from "vue-router";
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
 * 默认首页
 */
export const DefaultHomeRouter: RouteRecordRaw = {
  path: "/index",
  name: "DefaultHome",
  component: Layout,
  meta: {
    title: "默认首页",
    icon: "home",
  },
};

/**
 * 页面找不到找不到 404
 */
export const PageNotFoundRouter: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "404",
  component: () => import("/@/views/error/404.vue"),
  meta: {
    title: "ErrorPage",
    hidden: true,
  },
};

/**
 * 静态路由
 */
export const routes: RouteRecordRaw[] = [
  LoginRouter,
  HomeRouter,
  DefaultHomeRouter,
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
