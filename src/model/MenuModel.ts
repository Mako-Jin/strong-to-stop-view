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
