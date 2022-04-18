import { RouteRecordRaw } from "vue-router";
import { MenuPosition } from "/@/enums/menuEnums";
import { Layout } from "/@/layouts";

const SystemRouter: RouteRecordRaw = {
  path: "/system",
  name: "System",
  component: Layout,
  meta: {
    title: "router.system.title",
    icon: "setting",
    position: MenuPosition.SIDER,
  },
  children: [
    {
      path: "user",
      name: "UserMgr",
      meta: {
        title: "router.system.user.title",
        position: MenuPosition.SIDER,
      },
      component: () => import("/@/views/system/user/index.vue"),
    },
    {
      path: "menu",
      name: "MenuMgr",
      meta: {
        title: "router.system.menu.title",
        position: MenuPosition.SIDER,
      },
      component: () => import("/@/views/system/menu/index.vue"),
    },
    {
      path: "role",
      name: "RoleMgr",
      meta: {
        title: "router.system.role.title",
        position: MenuPosition.SIDER,
      },
      component: () => import("/@/views/system/role/index.vue"),
    },
  ],
};

export default SystemRouter;