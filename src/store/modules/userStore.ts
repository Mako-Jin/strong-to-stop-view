import { defineStore } from "pinia";
import { UserModel, UserState } from "/@/model/UserModel";
import { store } from "../index";
import { LocalStorage } from "../db";
import {
  USER_INFO_KEY,
  WEB_ACCESS_TOKEN_KEY,
  WEB_REFRESH_TOKEN_KEY,
  ROLES_LIST_INFO_KEY,
} from "/@/config/StoreConfig";
import { RoleState } from "/@/model/RoleModel";
import { getUserInfo } from "/@/service/userService";

export const useInstalledUserStore = defineStore({
  id: "store-user",
  state: (): UserState => ({
    /**
     * 用户信息
     */
    userInfo: null,

    /**
     * access token
     */
    accessToken: "",

    /**
     * refresh token
     */
    refreshToken: "",

    /**
     * 角色列表
     */
    roleList: [],
  }),
  getters: {
    getAccessToken(): string {
      return LocalStorage.get(WEB_ACCESS_TOKEN_KEY, this.accessToken);
    },
    getRefreshToken(): string {
      return LocalStorage.get(WEB_REFRESH_TOKEN_KEY, this.refreshToken);
    },
    getUserInfo(): UserModel {
      let userInfo = LocalStorage.get(USER_INFO_KEY, this.userInfo);
      if (!userInfo) {
        userInfo = getUserInfo();
      }
      return userInfo;
    },
    getRoleList(): RoleState[] {
      return LocalStorage.get(ROLES_LIST_INFO_KEY, this.roleList);
    },
    isAccessTokenTimeout(): boolean {
      return LocalStorage.isExpired(WEB_ACCESS_TOKEN_KEY);
    },
    isRefreshTokenTimeout(): boolean {
      return LocalStorage.isExpired(WEB_REFRESH_TOKEN_KEY);
    },
  },
  actions: {
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
      LocalStorage.set(WEB_ACCESS_TOKEN_KEY, accessToken, 29 * 60);
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken;
      LocalStorage.set(WEB_REFRESH_TOKEN_KEY, refreshToken, 2 * 60 * 60);
    },
    setUserInfo(userInfo: UserModel) {
      this.userInfo = userInfo;
      LocalStorage.set(USER_INFO_KEY, userInfo, 30 * 60);
    },
    setRoleList(roleList: RoleState[]) {
      this.roleList = roleList;
      LocalStorage.set(ROLES_LIST_INFO_KEY, roleList, 30 * 60);
    },
  },
});

export function useUnInstalledUserStore() {
  return useInstalledUserStore(store);
}
