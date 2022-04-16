import { DEFAULT_STORAGE_VALIDITY_PERIOD } from "/@/config/StoreConfig";
import { getStorageShortName } from "/@/utils/EnvUtils";

export class WebStorage {
  private storage: Storage;
  private prefixKey?: string;

  constructor(storage: Storage = sessionStorage) {
    this.storage = storage;
    this.prefixKey = getStorageShortName();
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  /**
   *
   * @param key
   * @param value
   * @param timeout
   */
  set(
    key: string,
    value: any,
    timeout: number = DEFAULT_STORAGE_VALIDITY_PERIOD
  ) {
    const stringData = JSON.stringify({
      value,
      createTime: Date.now(),
      expirationTime: new Date().getTime() + timeout * 1000 - 1,
    });
    this.storage.setItem(this.getKey(key), stringData);
  }

  /**
   *Read cache
   * @param {string} key
   * @memberof Cache
   */
  get(key: string, defaultValue: any = null): any {
    try {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) {
        return defaultValue;
      }
      const data = JSON.parse(val);
      const { value, expirationTime } = data;
      if (expirationTime < 0 || expirationTime >= new Date().getTime()) {
        return value;
      }
      this.remove(key);
    } catch (e) {
      return defaultValue;
    }
  }

  /**
   * Delete cache based on key
   * @param {string} key
   * @memberof Cache
   */
  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * Delete all caches of this instance
   */
  clear(): void {
    this.storage.clear();
  }
}
