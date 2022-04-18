import { RouteRecordRaw } from "vue-router";
import { MenuPosition } from "/@/enums/MenuEnums";
import { Layout } from "/@/layouts";

const SystemRouter: RouteRecordRaw = {
  path: "/tools",
  name: "Tools",
  component: Layout,
  meta: {
    title: "router.tools.title",
    icon: "setting",
    position: MenuPosition.FOOTER,
  },
  children: [
    {
      path: "fileMgr",
      name: "FileMgr",
      component: () => import("/@/views/file/index.vue"),
      meta: {
        title: "router.tools.file.title",
        icon: "file_mgr",
        position: MenuPosition.FOOTER,
      },
    },
  ],
};

export default SystemRouter;
