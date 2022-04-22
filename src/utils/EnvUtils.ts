import pkg from "../../package.json";

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
