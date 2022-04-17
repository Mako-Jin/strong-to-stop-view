import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

// 初始化 router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
