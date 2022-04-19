import { RouteRecordRaw } from "vue-router";
import { MenuPosition } from "/@/enums/MenuEnums";
import { Layout } from "/@/layouts";

const SystemRouter: RouteRecordRaw = {
  path: "/tools",
  name: "Tools",
  component: Layout,
  meta: {
    title: "tools.title",
    icon: "tools",
    position: MenuPosition.FOOTER,
  },
  children: [
    {
      path: "fileMgr",
      name: "FileMgr",
      component: () => import("/@/views/tools/file/index.vue"),
      meta: {
        title: "tools.file.title",
        icon: "file-mgr",
        position: MenuPosition.FOOTER,
      },
    },
  ],
};

export default SystemRouter;
