import { MenuPosition } from "/@/enums/menuEnums";

export {};

declare module "vue-router" {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 排序
    orderNo?: number;
    // title
    title: string;
    // 菜单位置
    position?: MenuPosition;
    // icon on tab
    icon?: string;
    // 是否显示
    hidden?: boolean;
  }
}
