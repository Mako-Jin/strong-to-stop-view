import { useUnInstalledRouterStore } from "/@/store/modules/routerStore";
import { menuStrategyFactory } from "./menuService";
import { RouteRecordRaw } from "vue-router";
import { router } from "/@/router";
import { PageEnum } from "/@/enums/PageEnums";
import { PageNotFoundRouter } from "/@/router/routes";

/**
 * 动态添加routes
 */
export async function dynamicAddRoute() {
  const routerStore = useUnInstalledRouterStore();
  if (!routerStore.getIsDynamicRouteLoaded) {
    const routes = await menuStrategyFactory.call();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    router.addRoute(PageNotFoundRouter as unknown as RouteRecordRaw);
    routerStore.setIsDynamicRouteLoaded(true);
  }
  router.replace(PageEnum.DEFAULT_HOME);
}
