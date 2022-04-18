import { defineStore } from "pinia";
import { MenuState } from "/@/model/MenuModel";
import { store } from "../index";
import {
  MENU_LIST_COME_FROM_KEY,
  SIDE_MENU_COLLAPSED_KEY,
} from "/@/config/StoreConfig";
import { LocalStorage } from "../db";
import { MenuDataSource } from "/@/enums/MenuEnums";

export const useInstalledMenuStore = defineStore({
  id: "store-menu",
  state: (): MenuState => ({
    collapsed: false,
    menuSource: MenuDataSource.ROUTER,
  }),
  getters: {
    getCollapsed(): boolean {
      this.collapsed = LocalStorage.get(
        SIDE_MENU_COLLAPSED_KEY,
        this.collapsed
      );
      return this.collapsed || false;
    },
    getMenuSource(): string {
      this.menuSource = LocalStorage.get(
        MENU_LIST_COME_FROM_KEY,
        this.menuSource
      );
      return this.menuSource || "";
    },
  },
  actions: {
    setCollapsed(collapsed: boolean): void {
      this.collapsed = collapsed;
      LocalStorage.set(SIDE_MENU_COLLAPSED_KEY, collapsed);
    },
    setMenuSource(menuSource: string): void {
      this.menuSource = menuSource;
      LocalStorage.set(MENU_LIST_COME_FROM_KEY, menuSource);
    },
  },
});

export function useUnInstalledMenuStore() {
  return useInstalledMenuStore(store);
}
