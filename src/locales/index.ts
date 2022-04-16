import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";

const files = import.meta.globEager("./lang/*.ts");

const messages: LocaleMessages<VueMessageType> = {};
Object.keys(files).forEach((c: string) => {
  const module = files[c].default;
  const moduleName: string = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, "$2");
  messages[moduleName] = module;
});

const i18n = createI18n({
  locale: localStorage.getItem("lang") || "zh_CN",
  messages,
});

export default i18n;
