import { RouteRecordRaw } from "vue-router";
import { MenuPosition } from "/@/enums/MenuEnums";
import { Layout } from "/@/layouts";

/**
 * 默认首页
 */
const DefaultHomeRouter: RouteRecordRaw = {
  path: "/index",
  name: "DefaultHome",
  component: Layout,
  redirect: "/home",
  meta: {
    title: "home.title",
    position: MenuPosition.SIDER,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: "/home",
      name: "DefaultHome",
      component: () => import("/@/views/system/index.vue"),
      meta: {
        title: "home.title",
        icon: "home-2",
        position: MenuPosition.SIDER,
      },
    },
  ],
};

export default DefaultHomeRouter;
