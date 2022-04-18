/**
 * 菜单类型，现在支持垂直、水平、和内嵌模式三种
 */
export enum MenuMode {
  DEFAULT = "vertical",
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
  INLINE = "inline",
}

/**
 * 菜单数据来源
 */
export enum MenuDataSource {
  DEFAULT = "getMenuListFromRouter",
  ROUTER = "getMenuListFromRouter",
  FILE = "getMenuListFromFile",
  BACK = "getMenuListFromRest",
}

/**
 * 菜单位置
 */
export enum MenuPosition {
  HEADER = "Header",
  SIDER = "Sider",
  FOOTER = "Footer",
}
