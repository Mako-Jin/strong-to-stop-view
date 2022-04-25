import { UserModel } from "/@/model/UserModel";
import httpRequest from "/@/utils/HttpUtils";

// 分页查询
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

// 新增用户
export const saveUser = (user: UserModel) => {
  return httpRequest.POST("userMgr/v1/saveUser", user);
};

// 根据用户id删除用户
export const deleteUserByUserId = (userId: string) => {
  return httpRequest.DELETE(`userMgr/v1/deleteUserByUserId/${userId}`);
};
