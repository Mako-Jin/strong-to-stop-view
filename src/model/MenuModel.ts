export interface MenuState {
  /**
   * 左侧菜单栏折叠状态
   */
  collapsed?: boolean;
  /**
   * 左侧菜单栏折叠状态
   */
  menuSource?: string;
  /**
   * 菜单栏打开的子菜单
   */
  openKeys: string[];
  /**
   * 菜单栏选中的子菜单
   */
  selectedKeys: string[];
}

export interface MenuModel {
  menuId: string;

  menuName: string;

  menuUrl: string;

  menuDesc: string;

  /**
   * 1: menu; 2: page; 3: operation
   */
  menuType: number;

  /**
   * 1: 启用；2、禁用
   */
  menuStatus?: number;

  sort: number;

  /**
   * 是否需要被授权；1：是；2：否
   */
  isNeedAuthorized: number;

  /**
   * 是否保密；1：是；2：否
   */
  isSecret: number;

  menuLevel: number;

  /**
   * 父id
   */
  parentId?: string;

  /**
   * 子菜单
   */
  children?: MenuModel[];

  createTime?: Date;

  updateTime?: Date;

  createUser?: string;

  updateUser?: string;
}
