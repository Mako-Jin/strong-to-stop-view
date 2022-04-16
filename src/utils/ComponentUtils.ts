import { App, Plugin } from "vue";

export const withInstall = <T>(comp: T) => {
  const c = comp as any;
  c.install = (app: App) => {
    app.component(c.displayName || c.name, comp);
  };

  return comp as T & Plugin;
};
