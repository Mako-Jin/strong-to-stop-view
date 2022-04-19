import { ContentTypeEnum, RequestMethodEnum } from "/@/enums/httpEnums";
import qs from "qs";
import { useUnInstalledUserStore } from "../store/modules/userStore";

class HttpRequest {
  private baseURL: string;
  private readonly defaultOption?: RequestInit;

  constructor(url: string, option?: RequestInit) {
    this.baseURL = url;
    this.defaultOption = option;
  }

  private preHandleUrl = (url: string) => {
    return `${this.baseURL}${url}`;
  };

  private preHandleParam = (url: string, params: any = {}) => {
    url += url.includes("?") ? "&" : "?";
    // 拼接时间戳
    params._t = new Date().getTime();
    url += qs.stringify(params);
    return url;
  };

  private wrapFormData = (options: any = {}) => {
    const formData = new FormData();
    for (const key of Object.keys(options)) {
      const value = options[key];
      formData.append(key, value);
    }
    return formData;
  };

  private getAccessToken = (): string => {
    const accessToken = useUnInstalledUserStore().getAccessToken;
    return accessToken ? `${"SanMako "}${accessToken}` : "";
  };

  private checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      // 响应成功
      return response;
    } else if (response.status === 500) {
      return response;
    } else if (response.status === 403) {
      return response;
    }
    throw new Error(response.statusText);
  }

  private async parseResult(response: Response) {
    const contentType = response.headers.get("Content-Type");
    if (contentType !== null) {
      switch (contentType) {
        case ContentTypeEnum.TEXT:
          return response.text();
        case ContentTypeEnum.JSON:
          return response.json();
        case ContentTypeEnum.FORM_DATA:
          return response.formData();
        default:
          return response.json();
      }
    }
    return response.json();
  }

  /**
   * get请求
   */
  async GET<P = {}>(url: string, params?: P, options?: RequestInit) {
    const urlAddress = this.preHandleParam(this.preHandleUrl(url), params);
    let opt = {
      method: RequestMethodEnum.GET,
      headers: {
        smk_Authorization: this.getAccessToken(),
      },
    };
    opt = Object.assign(opt, options);
    return this.toFetch(urlAddress, opt);
  }

  /**
   * post请求
   */
  async POST<P = {}>(url: string, params?: P, options?: RequestInit) {
    url = this.preHandleUrl(url);
    let opt = {
      method: RequestMethodEnum.POST,
      // credentials: "include",
      headers: {
        "Content-Type": ContentTypeEnum.JSON,
        smk_Authorization: this.getAccessToken(),
      },
      body: JSON.stringify(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  /**
   * put请求
   */
  async PUT<P = {}>(url: string, params?: P, options?: RequestInit) {
    url = this.preHandleUrl(url);
    let opt = {
      method: RequestMethodEnum.PUT,
      headers: {
        "Content-Type": ContentTypeEnum.JSON,
        smk_Authorization: this.getAccessToken(),
      },
      body: JSON.stringify(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  /**
   * put请求
   */
  async DELETE<P = {}>(url: string, params?: P, options?: RequestInit) {
    url = this.preHandleUrl(url);
    let opt = {
      method: RequestMethodEnum.DELETE,
      headers: {
        "Content-Type": ContentTypeEnum.JSON,
        smk_Authorization: this.getAccessToken(),
      },
      body: JSON.stringify(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  /**
   * 上传
   */
  async UPLOAD<P = {}>(url: string, params?: P, options?: RequestInit) {
    url = this.preHandleUrl(url);
    let opt = {
      method: RequestMethodEnum.POST,
      headers: {
        smk_Authorization: this.getAccessToken(),
      },
      body: this.wrapFormData(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  /**
   * 下载
   */
  // async DOWNLOAD() {}

  /**
   * form表单
   */
  async form<P = {}>(url: string, params?: P, options?: RequestInit) {
    let opt = {
      method: RequestMethodEnum.POST,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        smk_Authorization: this.getAccessToken(),
      },
      body: qs.stringify(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  async toFetch(url: string, options?: RequestInit) {
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    try {
      const opt = Object.assign({}, this.defaultOption || {}, options || {});
      const response = await fetch(url, opt);
      clearTimeout(timeoutId);
      return await this.processResult(response);
    } catch (error) {
      clearTimeout(timeoutId);
      Promise.reject(error);
    }
  }

  private async processResult(response: Response) {
    const result = this.checkStatus(response);
    return this.parseResult(result);
  }
}

/**
 * fetch取消请求
 */
const controller = new AbortController();

/**
 * fetch请求默认的配置
 */
const defaultOption: RequestInit = {
  // RequestMethodEnum : GET | POST | PUT | DELETE
  method: RequestMethodEnum.GET,
  // string[][] | Record<string, string> | Headers;
  headers: {
    // ContentTypeEnum : TEXT | JSON | FORM_URLENCODED | FORM_DATA
    // 官方默认值是ContentTypeEnum.TEXT
    "Content-Type": ContentTypeEnum.JSON,
    "Access-Control-Allow-Origin": "*",
  },
  body: undefined,
  // referrer属性用于设定fetch()请求的referer标头
  referrer: "about:client",
  // referrerPolicy: no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
  // referrerPolicy:no-referrer：不发送Referer标头。
  // referrerPolicy:origin：Referer标头只包含域名，不包含完整的路径。
  // referrerPolicy:origin-when-cross-origin：同源请求Referer标头包含完整的路径，跨域请求只包含域名。
  // referrerPolicy:same-origin：跨域请求不发送Referer，同源请求发送。
  // referrerPolicy:strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。
  // referrerPolicy:strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
  // referrerPolicy:unsafe-url：不管什么情况，总是发送Referer标头。
  referrerPolicy: "no-referrer-when-downgrade",
  // mode:cors 默认值，允许跨域请求
  // mode:same-origin：只允许同源请求 |
  // mode:no-cors：
  mode: "cors",
  // credentials:same-origin:默认值，同源请求时发送 Cookie，跨域请求时不发送
  // credentials:include：不管同源请求，还是跨域请求，一律发送 Cookie
  // credentials:omit：一律不发送
  credentials: "same-origin",
  // 直接请求远程服务器，并且更新缓存
  cache: "reload",
  // redirect:follow：默认值，fetch()跟随 HTTP 跳转
  // redirect:error：如果发生跳转，fetch()就报错
  // redirect:manual：fetch()不跟随 HTTP 跳转，但是response.url属性会指向新的 URL，response.redirected属性会变为true，由开发者自己决定后续如何处理跳转
  redirect: "follow",
  // integrity属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值
  integrity: "",
  // keepalive属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据
  keepalive: false,
  // signal属性指定一个 AbortSignal 实例，用于取消fetch()请求
  signal: controller.signal,
};

const baseURL = import.meta.env.VITE_REST_BASE_URL;

const httpRequest = new HttpRequest(baseURL, defaultOption);

export default httpRequest;
