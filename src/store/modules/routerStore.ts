import { defineStore } from "pinia";
import { store } from "../index";
import { RouterState } from "/@/model/RouterModel";

export const useInstalledRouterStore = defineStore({
  id: "store-router",
  state: (): RouterState => ({
    /**
     * 动态路由是否已经加载过
     */
    isDynamicRouteLoaded: false,
  }),
  getters: {
    getIsDynamicRouteLoaded(): boolean {
      return this.isDynamicRouteLoaded;
    },
  },
  actions: {
    setIsDynamicRouteLoaded(loaded: boolean) {
      this.isDynamicRouteLoaded = loaded;
    },
  },
});

export function useUnInstalledRouterStore() {
  return useInstalledRouterStore(store);
}
