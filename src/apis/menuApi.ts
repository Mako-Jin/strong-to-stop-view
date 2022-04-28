import { MenuModel } from "/@/model/MenuModel";
import httpRequest from "/@/utils/HttpUtils";

/**
 * 获取菜单树
 * @returns
 */
export const getMenuTreeList = () => {
  return httpRequest.GET("menuMgr/v1/getMenuTreeList");
};

/**
 * 根据父id获取菜单列表
 */
export const getMenuListByParentId = (parentId: string) => {
  return httpRequest.GET("menuMgr/v1/getMenuByParentId", { parentId });
};

/**
 * 新增菜单
 * @param menu
 * @returns
 */
export const saveMenu = (menu: MenuModel) => {
  return httpRequest.POST("menuMgr/v1/saveMenu", menu);
};

/**
 * 根据roleId获取menuIds
 */
export const getMenuIdsByRoleId = (roleId: string) => {
  return httpRequest.GET(`menuMgr/v1/getMenuIdsByRoleId/${roleId}`);
};

/**
 * 根据menuId删除menu
 */
export const deleteMenuByMenuId = (menuId: string) => {
  return httpRequest.DELETE(`/menuMgr/v1/deleteMenuByMenuId/${menuId}`);
};
