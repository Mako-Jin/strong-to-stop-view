import { PageEnum } from "/@/enums/PageEnums";
import { useUnInstalledUserStore } from "/@/store/modules/userStore";
import { useUnInstalledRouterStore } from "/@/store/modules/routerStore";
import { refreshAccessToken } from "/@/service/loginService";
import { dynamicAddRoute } from "/@/service/routerService";
import { PageNotFoundRouter } from "/@/router/routes";
import { Router } from "vue-router";

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList: PageEnum[] = [LOGIN_PATH];

const userStore = useUnInstalledUserStore();
const routeStore = useUnInstalledRouterStore();

export function createPermissionGuard(router: Router) {
  /**
   * to: 即将要进入的目标 用一种标准化的方式
   * from: 当前导航正要离开的路由 用一种标准化的方式
   */
  router.beforeEach(async (to, from, next) => {
    /**
     * 白名单放行
     */
    if (toWhiteList(to, next)) {
      return;
    }

    /**
     * token过期
     */
    if (refreshTokenExpired(to, next)) {
      return;
    }

    /**
     * token过期
     */
    if (!userStore.getAccessToken || userStore.isAccessTokenTimeout) {
      /**
       * 需要刷新一次token
       */
      refreshAccessToken();
    }

    /**
     * 登录之后跳转404,转到首页
     */
    if (loginRedirectHome(to, from, next)) {
      return;
    }

    if (routeStore.getIsDynamicRouteLoaded) {
      next();
      return;
    }

    dynamicAddRoute();

    if (to.name === PageNotFoundRouter.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}

/**
 * 白名单放行
 */
function toWhiteList(to, next) {
  if (whitePathList.includes(to.path as PageEnum)) {
    if (to.path === LOGIN_PATH && !userStore.isAccessTokenTimeout) {
      next((to.query?.redirect as string) || "/");
      return true;
    }
    next();
    return true;
  }
  return false;
}

/**
 * token过期
 */
function refreshTokenExpired(to, next) {
  if (!userStore.getRefreshToken || userStore.isRefreshTokenTimeout) {
    const redirectData: {
      path: string;
      replace: boolean;
      query?: Recordable<string>;
    } = {
      path: LOGIN_PATH,
      replace: true,
    };
    if (to.path) {
      redirectData.query = {
        ...redirectData.query,
        redirect: to.path,
      };
    }
    next(redirectData);
    return true;
  }
  return false;
}

function loginRedirectHome(to, from, next) {
  if (
    from.path === LOGIN_PATH &&
    to.name === PageNotFoundRouter.name &&
    to.fullPath !== PageEnum.DEFAULT_HOME
  ) {
    next(PageEnum.DEFAULT_HOME);
    return true;
  }
  return false;
}
