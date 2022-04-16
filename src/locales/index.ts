import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";
import { useUnInstalledLocaleStore } from "../store/modules/localeStore";

const files = import.meta.globEager("./lang/*.ts");

const messages: LocaleMessages<VueMessageType> = {};
Object.keys(files).forEach((c: string) => {
  const module = files[c].default;
  const moduleName: string = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, "$2");
  messages[moduleName] = module;
});

const localeStore = useUnInstalledLocaleStore();

const i18n = createI18n({
  locale: localeStore.getCurrentLocale,
  messages,
});

export default i18n;
