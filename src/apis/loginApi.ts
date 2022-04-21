import { LoginModel, TokenModel } from "/@/model/UserModel";
import httpRequest from "/@/utils/HttpUtils";

/**
 * 登录接口
 * @param data
 * @returns
 */
export const loginApi = (params: LoginModel) => {
  return httpRequest.POST("login", params, {}, false);
};

/**
 * 获取当前用户信息
 */
export function getUserInfoApi() {
  return httpRequest.GET("auth/v1/current-user");
}

/**
 * 刷新token
 */
export function refreshTokenApi(params: TokenModel) {
  return httpRequest.POST("auth/v1/token-refresh", params, {}, false);
}
