import { ViteEnv } from "/@/model/EnvModel";
import pkg from "../../package.json";

/**
 * 转换并重新封装环境配置文件的配置
 * @param envConfig
 * @returns
 */
export function transformWrapperEnv(
  envConfig: Record<string, string>
): ViteEnv {
  const ret: any = {};
  let realName;
  for (const envName of Object.keys(envConfig)) {
    realName = envConfig[envName].replace(/\\n/g, "\n");
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;
    ret[envName] = realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    ret[envName] = realName;
  }
  return ret;
}

/**
 * 获取存储key的公共前缀
 * @returns
 */
export function getStorageShortName() {
  const appGlobalTitle = import.meta.env.VITE_APP_GLOBAL_TITLE.replaceAll(
    " ",
    "-"
  );
  return `${appGlobalTitle}${`-${pkg.version}`}-`.toUpperCase();
}
