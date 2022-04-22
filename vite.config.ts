import { UserConfig, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import pkg from "./package.json";
import dayjs from "dayjs";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const root = process.cwd();

const pathResolve = (dir: string) => resolve(root, ".", dir);

const { dependencies, devDependencies, name, version } = pkg;

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_OUTPUT_DIR, VITE_DROP_CONSOLE } =
    loadEnv(mode, root);

  return {
    // 项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    root: root,
    /**
     * 开发或生产环境服务的公共基础路径。合法的值包括以下几种：
     *   -> 绝对 URL 路径名，例如 /foo/
     *   -> 完整的 URL，例如 https://foo.com/
     *   -> 空字符串或 ./（用于开发环境）
     */
    base: VITE_PUBLIC_PATH,
    // 默认:root,用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
    envDir: root,
    // 默认:VITE_  配置为其他不生效，未研究。
    // envPrefix: "STS_", // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。不能为“”
    resolve: {
      alias: resolveAlias,
    },
    server: getServer(Number(VITE_PORT)),
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
    build: {
      outDir: VITE_OUTPUT_DIR, // 指定输出路径
      // 启用/禁用 brotli 压缩大小报告,禁用该功能可能会提高大型项目的构建性能
      brotliSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // setting vue-i18n-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      //* css模块化
      modules: {
        // css模块化 文件以.module.[css|less|scss]结尾
        generateScopedName: "[name]__[local]___[hash:base64:5]",
        hashPrefix: "prefix",
      },
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 用于全局导入，以避免需要单独导入每个样式文件。
            // reference:  避免重复引用
            hack: `true; @import (reference) "${resolve(
              "src/styles/config.less"
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
    plugins: plugins,
  };
};

const resolveAlias = [
  {
    find: "vue-i18n",
    replacement: "vue-i18n/dist/vue-i18n.cjs.js",
  },
  {
    find: /\/@\//,
    replacement: pathResolve("src") + "/",
  },
];

const getServer = (VITE_PORT: number) => {
  return {
    host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    port: VITE_PORT,
    strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    // Load proxy configuration from .env
    proxy: {
      "/sts-admin": {
        target: "http://localhost:36800",
        changeOrigin: true,
        ws: false,
        rewrite: (path) => path.replace("^/sts-admin", "sts-admin"),
        secure: false,
      },
    },
    // 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
    hmr: {
      overlay: true,
    },
  };
};

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

/**
 * 插件
 */
const plugins = [
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [pathResolve("src/assets/svg")],
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]",
  }),
  vue(),
];
