import { UserConfig, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import pkg from "./package.json";
import dayjs from "dayjs";
import { transformWrapperEnv } from "./src/utils/EnvUtils";

const pathResolve = (dir: string) => resolve(process.cwd(), ".", dir);

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = transformWrapperEnv(loadEnv(mode, root));
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_OUTPUT_DIR, VITE_DROP_CONSOLE } =
    env;

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
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
      ],
    },
    server: {
      host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      port: VITE_PORT,
      strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    },
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
    plugins: [vue()],
  };
};
