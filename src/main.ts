import "virtual:svg-icons-register";
// ant-design-vue 基础样式
import "ant-design-vue/dist/antd.less";

import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import { registerGlobComponents } from "/@/components";

import i18n from "/@/locales";

import { router } from "/@/router";
import { setupRouterGuard } from "/@/router/guard";

import Antd, { message } from "ant-design-vue";

const app = createApp(App);

// 注册全局组件
registerGlobComponents(app);

// 全局加载store
app.use(store);

// 全局加载 vue-i18n
app.use(i18n);

// 全局加载router
app.use(router);

// 路由守卫
setupRouterGuard(router);

// 全局引入ant-design-vue
app.use(Antd);

message.config({
  maxCount: 1,
});

app.mount("#app");
