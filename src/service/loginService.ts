import { AuthTypeEnum } from "../enums/LoginEnums";
import { ResultModel } from "../model/HttpModel";
import { loginApi } from "/@/apis/loginApi";
import { LoginModel } from "/@/model/UserModel";

/**
 * 用户名密码登录
 * @param loginParams
 */
export const loginByUsernamePassword = async (loginParams: LoginModel) => {
  const { username, password } = loginParams;
  const res: ResultModel = await loginApi({
    username: username,
    password: password,
    authType: AuthTypeEnum.USERNAME_PASSWORD,
  });
  return res;
};
