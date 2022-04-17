import "virtual:svg-icons-register";
// ant-design-vue 基础样式
import "ant-design-vue/dist/antd.less";

import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import { registerGlobComponents } from "/@/components";

import i18n from "/@/locales";

import { router } from "/@/router";

import Antd from "ant-design-vue";

const app = createApp(App);

// 注册全局组件
registerGlobComponents(app);

// 全局加载store
app.use(store);

// 全局加载 vue-i18n
app.use(i18n);

// 全局加载router
app.use(router);

// 全局引入ant-design-vue
app.use(Antd);

app.mount("#app");
