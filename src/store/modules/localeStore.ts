import { defineStore } from "pinia";
import { localeSetting } from "/@/config/LocaleConfig";
import { LOCAL_STORAGE_KEY_CURRENT_LOCALE } from "/@/config/StoreConfig";
import { LocaleType } from "/@/enums/LocaleEnums";
import { LocaleState } from "/@/model/LocaleModel";
import { store } from "../index";
import { LocalStorage } from "../db";

export const useInstalledLocaleStore = defineStore({
  id: "store-locale",
  state: (): LocaleState => ({
    currentLocale: LocaleType.ZH_CN,
  }),
  getters: {
    getCurrentLocale(): string {
      const defaultLocale = this.currentLocale
        ? this.currentLocale
        : localeSetting.defaultLocale;
      return LocalStorage.get(LOCAL_STORAGE_KEY_CURRENT_LOCALE, defaultLocale);
    },
  },
  actions: {
    setCurrentLocale(currentLocale: string) {
      this.currentLocale = currentLocale;
      LocalStorage.set(LOCAL_STORAGE_KEY_CURRENT_LOCALE, currentLocale);
    },
  },
});

export function useUnInstalledLocaleStore() {
  return useInstalledLocaleStore(store);
}
