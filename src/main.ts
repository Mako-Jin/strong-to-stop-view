import "virtual:svg-icons-register";

import { createApp } from "vue";
import App from "./App.vue";
import { registerGlobComponents } from "/@/components";

const app = createApp(App);

registerGlobComponents(app);

app.mount("#app");
