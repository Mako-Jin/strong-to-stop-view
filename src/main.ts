import "virtual:svg-icons-register";

import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import { registerGlobComponents } from "/@/components";

import i18n from "/@/locales";

const app = createApp(App);

// 注册全局组件
registerGlobComponents(app);

// 全局加载store
app.use(store);

// 全局加载 vue-i18n
app.use(i18n);

app.mount("#app");
