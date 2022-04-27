import { UserModel } from "/@/model/UserModel";
import httpRequest from "/@/utils/HttpUtils";

/**
 * 分页查询
 * @param pageSize
 * @param currentPageNo
 * @param conditions
 * @returns
 */
export const getUserPageList = (
  pageSize?: number,
  currentPageNo?: number,
  conditions?: {}
) => {
  return httpRequest.GET(
    `userMgr/v1/getUserPageList/${pageSize}/${currentPageNo}`,
    conditions
  );
};

/**
 * 新增用户
 * @param user
 * @returns
 */
export const saveUser = (user: UserModel) => {
  return httpRequest.POST("userMgr/v1/saveUser", user);
};

/**
 * 根据用户id删除用户
 * @param userId
 * @returns
 */
export const deleteUserByUserId = (userId: string) => {
  return httpRequest.DELETE(`userMgr/v1/deleteUserByUserId/${userId}`);
};

/**
 * 根据用户id获取用户信息
 * @param userId
 * @returns
 */
export const getUserByUserId = (userId: string) => {
  return httpRequest.GET(`userMgr/v1/getUserByUserId/${userId}`);
};

/**
 * 更新用户
 * @param user
 * @returns
 */
export const updateUserByUserId = (user: UserModel) => {
  return httpRequest.PUT("userMgr/v1/updateUser", user);
};
