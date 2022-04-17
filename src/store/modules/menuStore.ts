import { defineStore } from "pinia";
import { MenuState } from "/@/model/MenuModel";
import { store } from "../index";
import { SIDE_MENU_COLLAPSED_KEY } from "/@/config/StoreConfig";
import { LocalStorage } from "../db";

export const useInstalledMenuStore = defineStore({
  id: "store-menu",
  state: (): MenuState => ({
    collapsed: false,
  }),
  getters: {
    getCollapsed(): boolean {
      this.collapsed = LocalStorage.get(
        SIDE_MENU_COLLAPSED_KEY,
        this.collapsed
      );
      return this.collapsed || false;
    },
  },
  actions: {
    setCollapsed(collapsed: boolean): void {
      this.collapsed = collapsed;
      LocalStorage.set(SIDE_MENU_COLLAPSED_KEY, collapsed);
    },
  },
});

export function useUnInstalledMenuStore() {
  return useInstalledMenuStore(store);
}
