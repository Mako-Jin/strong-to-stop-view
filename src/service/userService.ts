import { UserModel } from "/@/model/UserModel";
import { getUserInfoApi } from "/@/apis/loginApi";
import { ResultModel } from "/@/model/HttpModel";
import { useUnInstalledUserStore } from "/@/store/modules/userStore";
import { isArray } from "/@/utils/TypeUtils";

export const getUserInfo = async (): Promise<UserModel | null> => {
  const userStore = useUnInstalledUserStore();
  if (!userStore.getAccessToken) {
    return null;
  }
  const res: ResultModel = await getUserInfoApi();
  if (!res) {
    return null;
  }
  const userInfo: UserModel = res[0];
  if (isArray(userInfo.roles)) {
    userStore.setRoleList(userInfo.roles);
  } else {
    userInfo.roles = [];
    userStore.setRoleList([]);
  }
  userStore.setUserInfo(userInfo);
  return userInfo;
};
