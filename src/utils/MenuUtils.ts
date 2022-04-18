import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import { isUrl } from "./TypeUtils";
import { cloneDeep, omit } from "lodash-es";

/**
 * 将菜单相对路径转化为绝对路径
 * @param menus 菜单列表
 * @param parentPath 父级路径
 */
export function joinParentPath(menus: RouteRecordRaw[], parentPath = "") {
  menus.forEach((menu: RouteRecordRaw) => {
    if (!(menu.path?.startsWith("/") || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path);
    }
  });
}

export function flatMultiLevelRoutes(
  routeModules: RouteRecordRaw[]
): RouteRecordRaw[] {
  const modules: RouteRecordRaw[] = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}

// Routing level upgrade
function promoteRouteLevel(routeModule: RouteRecordRaw) {
  // Use vue-router to splice menus
  let router: Router | null = createRouter({
    routes: [routeModule],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.map((item) =>
    omit(item, "children")
  );
}

function addToChildren(
  routes: RouteRecordRaw[],
  children: RouteRecordRaw[],
  routeModule: RouteRecordRaw
) {
  children.forEach((child) => {
    const route = routes.find((item) => item.name === child.name);
    if (route) {
      routeModule.children = routeModule.children || [];
      if (!routeModule.children.find((item) => item.name === route.name)) {
        routeModule.children?.push(route as unknown as RouteRecordRaw);
      }
      if (child.children?.length) {
        addToChildren(routes, child.children, routeModule);
      }
    }
  });
}

/**
 * 判断是否为多层级菜单
 * @param routeModule 路由
 * @returns boolean true:是;false:否;
 */
function isMultipleRoute(routeModule: RouteRecordRaw) {
  if (
    !routeModule ||
    !Reflect.has(routeModule, "children") ||
    !routeModule.children?.length
  ) {
    return false;
  }
  const children = routeModule.children;
  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
