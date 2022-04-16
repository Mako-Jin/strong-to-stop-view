import { App } from "vue";
import { SvgIcon } from "./Icon";

export function registerCustomComponents(app: App) {
  app.use(SvgIcon);
}

export function registerGlobComponents(app: App) {
  registerCustomComponents(app);
}
