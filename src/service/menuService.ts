import { unref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { MenuDataSource } from "../enums/MenuEnums";
import { useMenuSetting } from "../hooks/useMenuSetting";
import { flatMultiLevelRoutes, joinParentPath } from "/@/utils/MenuUtils";
import { asyncRoutes } from "/@/router/routes";

/**
 * 获取菜单列表 -- 策略模式
 */
interface MenuStrategy {
  getMenuList(): RouteRecordRaw[];
}

/**
 * 路由中获取菜单列表
 */
class MenuListFromRouter implements MenuStrategy {
  public getMenuList(): RouteRecordRaw[] {
    const routes = asyncRoutes.filter((route) => !route.meta?.hidden);
    joinParentPath(routes);
    routes.sort((a, b) => {
      return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
    });
    return flatMultiLevelRoutes(routes);
  }
}

/**
 * 后台接口获取菜单列表
 */
class MenuListFromRestApi implements MenuStrategy {
  getMenuList(): RouteRecordRaw[] {
    return [];
  }
}

/**
 * 文件中获取菜单列表
 */
class MenuListFromFile implements MenuStrategy {
  getMenuList(): RouteRecordRaw[] {
    return [];
  }
}

/**
 * 策略工厂
 */
class MenuStrategyFactory {
  private getMenuStrategy() {
    const { getMenuSource } = useMenuSetting();
    switch (unref(getMenuSource)) {
      case MenuDataSource.ROUTER:
        return new MenuListFromRouter();
      case MenuDataSource.FILE:
        return new MenuListFromFile();
      case MenuDataSource.BACK:
        return new MenuListFromRestApi();
      default:
        return new MenuListFromRouter();
    }
  }

  public call() {
    return this.getMenuStrategy().getMenuList();
  }
}

export const menuStrategyFactory = new MenuStrategyFactory();
