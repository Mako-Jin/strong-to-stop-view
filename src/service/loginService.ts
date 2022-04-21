import { AuthTypeEnum } from "/@/enums/LoginEnums";
import { ResultModel } from "/@/model/HttpModel";
import { useUnInstalledUserStore } from "/@/store/modules/userStore";
import { dynamicAddRoute } from "./routerService";
import { getUserInfo } from "./userService";
import { loginApi, refreshTokenApi } from "/@/apis/loginApi";
import { LoginModel } from "/@/model/UserModel";
import { LocalStorage } from "/@/store/db";
import {
  WEB_ACCESS_TOKEN_KEY,
  WEB_REFRESH_TOKEN_KEY,
} from "/@/config/StoreConfig";

/**
 * 用户名密码登录
 * @param loginParams
 */
export const loginByUsernamePassword = async (loginParams: LoginModel) => {
  const userStore = useUnInstalledUserStore();
  const { username, password } = loginParams;
  const res: ResultModel = await loginApi({
    username: username,
    password: password,
    authType: AuthTypeEnum.USERNAME_PASSWORD,
  });
  if (!res) {
    return;
  }
  const { accessToken, refreshToken } = res[0];
  userStore.setAccessToken(accessToken);
  userStore.setRefreshToken(refreshToken);
  const userInfo = await getUserInfo();
  if (userInfo) {
    dynamicAddRoute();
  }
};

/**
 * 刷新token
 */
export const refreshAccessToken = async () => {
  const userStore = useUnInstalledUserStore();
  if (
    userStore.getRefreshToken &&
    !LocalStorage.isExpired(WEB_REFRESH_TOKEN_KEY) &&
    LocalStorage.isExpired(WEB_ACCESS_TOKEN_KEY)
  ) {
    const accessToken = userStore.getAccessToken;
    const refreshToken = userStore.getRefreshToken;
    const res = await refreshTokenApi({ accessToken, refreshToken });
    userStore.setAccessToken(res[0].accessToken);
    userStore.setRefreshToken(res[0].refreshToken);
  }
};
