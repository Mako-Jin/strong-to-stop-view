import { RouteRecordRaw } from "vue-router";
import { MenuPosition } from "/@/enums/menuEnums";
import { Layout } from "/@/layouts";

const SystemRouter: RouteRecordRaw = {
  path: "/system",
  name: "System",
  component: Layout,
  redirect: "/system/user",
  meta: {
    title: "system.title",
    icon: "setting",
    position: MenuPosition.SIDER,
  },
  children: [
    {
      path: "dept",
      name: "DeptMgr",
      meta: {
        title: "system.dept.title",
        position: MenuPosition.SIDER,
      },
      component: () => import("/@/views/system/dept/index.vue"),
    },
    {
      path: "user",
      name: "UserMgr",
      meta: {
        title: "system.user.title",
        position: MenuPosition.SIDER,
      },
      component: () => import("/@/views/system/user/index.vue"),
    },
    {
      path: "menu",
      name: "MenuMgr",
      meta: {
        title: "system.menu.title",
        position: MenuPosition.SIDER,
      },
      component: () => import("/@/views/system/menu/index.vue"),
    },
    {
      path: "role",
      name: "RoleMgr",
      meta: {
        title: "system.role.title",
        position: MenuPosition.SIDER,
      },
      component: () => import("/@/views/system/role/index.vue"),
    },
  ],
};

export default SystemRouter;
