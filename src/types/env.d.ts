// / <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
  readonly VITE_DROP_CONSOLE: boolean;
  readonly VITE_REST_BASE_URL: string;
  readonly VITE_APP_GLOBAL_TITLE: string;
  readonly VITE_REQUEST_TIMEOUT: number;
  readonly VITE_TOKEN_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
