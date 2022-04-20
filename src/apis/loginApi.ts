import { LoginModel } from "/@/model/UserModel";
import httpRequest from "/@/utils/HttpUtils";

/**
 * 登录接口
 * @param data
 * @returns
 */
export const loginApi = (params: LoginModel) => {
  return httpRequest.POST("login", params);
};

/**
 * 获取当前用户信息
 */
export function getUserInfoApi() {
  return httpRequest.GET("auth/v1/current-user");
}
