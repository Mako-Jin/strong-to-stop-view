import { ContentTypeEnum, RequestMethodEnum } from "/@/enums/httpEnums";
import qs from "qs";
import { useUnInstalledUserStore } from "/@/store/modules/userStore";
import { message } from "ant-design-vue";
import i18n from "/@/locales";
import { ResultModel } from "/@/model/HttpModel";

class HttpRequest {
  /**
   * 请求超时时间
   */
  private readonly options?: RequestInit;

  private baseURL: string;

  private t = i18n.global.t;

  /**
   * 请求超时时间
   */
  private timeout: number;

  /**
   * token前缀
   */
  private tokenPrefix: string;

  constructor(
    url: string,
    defaultOption?: RequestInit,
    tokenPrefix = "SanMako",
    timeout = 2000
  ) {
    this.baseURL = url;
    this.options = defaultOption;
    this.timeout = timeout;
    this.tokenPrefix = tokenPrefix;
  }

  /**
   * 所有地址加公共前缀
   * @param url
   * @returns
   */
  private preHandleUrl = (url: string) => {
    return `${this.baseURL}${url}`;
  };

  /**
   * 请求地址问号拼接参数并加时间戳
   * @param url
   * @param params
   * @returns
   */
  private preHandleParam = (url: string, params: any = {}) => {
    url += url.includes("?") ? "&" : "?";
    // 拼接时间戳
    params._t = new Date().getTime();
    url += qs.stringify(params);
    return url;
  };

  /**
   * 封装form-data参数
   * @param options
   * @returns
   */
  private wrapFormData = (options: any = {}) => {
    const formData = new FormData();
    for (const key of Object.keys(options)) {
      const value = options[key];
      formData.append(key, value);
    }
    return formData;
  };

  /**
   * 获取认证token
   * @returns
   */
  private getAccessToken = (withToken = true): string => {
    if (withToken) {
      const accessToken = useUnInstalledUserStore().getAccessToken;
      return accessToken ? `${this.tokenPrefix}${" "}${accessToken}` : "";
    }
    return "";
  };

  /**
   * 获取响应结果
   * @param response
   * @returns
   */
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
  async GET<P = {}>(
    url: string,
    params?: P,
    options?: RequestInit,
    withToken = true
  ) {
    const urlAddress = this.preHandleParam(this.preHandleUrl(url), params);
    let opt = {
      method: RequestMethodEnum.GET,
      headers: {
        smk_Authorization: this.getAccessToken(withToken),
      },
    };
    opt = Object.assign(opt, options);
    return this.toFetch(urlAddress, opt);
  }

  /**
   * post请求
   */
  async POST<P = {}>(
    url: string,
    params?: P,
    options?: RequestInit,
    withToken = true
  ) {
    url = this.preHandleUrl(url);
    let opt = {
      method: RequestMethodEnum.POST,
      headers: {
        "Content-Type": ContentTypeEnum.JSON,
        smk_Authorization: this.getAccessToken(withToken),
      },
      body: JSON.stringify(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  /**
   * put请求
   */
  async PUT<P = {}>(
    url: string,
    params?: P,
    options?: RequestInit,
    withToken = true
  ) {
    url = this.preHandleUrl(url);
    let opt = {
      method: RequestMethodEnum.PUT,
      headers: {
        "Content-Type": ContentTypeEnum.JSON,
        smk_Authorization: this.getAccessToken(withToken),
      },
      body: JSON.stringify(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  /**
   * delete请求
   */
  async DELETE<P = {}>(
    url: string,
    params?: P,
    options?: RequestInit,
    withToken = true
  ) {
    url = this.preHandleUrl(url);
    let opt = {
      method: RequestMethodEnum.DELETE,
      headers: {
        "Content-Type": ContentTypeEnum.JSON,
        smk_Authorization: this.getAccessToken(withToken),
      },
      body: JSON.stringify(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  /**
   * 上传
   */
  async UPLOAD<P = {}>(
    url: string,
    params?: P,
    options?: RequestInit,
    withToken = true
  ) {
    const urlAddress = this.preHandleUrl(url);
    let opt = {
      method: RequestMethodEnum.POST,
      headers: {
        smk_Authorization: this.getAccessToken(withToken),
      },
      body: this.wrapFormData(params),
    };
    opt = Object.assign(opt, options);
    const response = await fetch(urlAddress, opt).then((response) => {
      return response.json();
    });
    return response;
  }

  /**
   * 下载
   */
  async DOWNLOAD<P = {}>(
    url: string,
    params?: P,
    options?: RequestInit,
    withToken = true
  ) {
    const urlAddress = this.preHandleParam(this.preHandleUrl(url), params);
    let opt = {
      method: RequestMethodEnum.GET,
      headers: {
        smk_Authorization: this.getAccessToken(withToken),
      },
    };
    opt = Object.assign(opt, options);
    const response = await fetch(urlAddress, opt).then((response) => {
      return response.blob();
    });
    return response;
  }

  /**
   * form表单
   */
  async form<P = {}>(
    url: string,
    params?: P,
    options?: RequestInit,
    withToken = true
  ) {
    let opt = {
      method: RequestMethodEnum.POST,
      headers: {
        "Content-type": ContentTypeEnum.FORM_URLENCODED,
        smk_Authorization: this.getAccessToken(withToken),
      },
      body: qs.stringify(params),
    };
    opt = Object.assign(opt, options);
    return this.toFetch(url, opt);
  }

  /**
   * 基础请求
   * @param url
   * @param options
   * @returns
   */
  async toFetch(url: string, options?: RequestInit) {
    message.loading({
      content: this.t("http.status.pending"),
      duration: 0,
      key: url,
    });
    // fetch 取消请求
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    try {
      const opt = Object.assign({}, this.options || {}, options || {}, {
        signal: controller.signal,
      });
      const response = await fetch(url, opt);
      clearTimeout(timeoutId);
      const result: ResultModel = await this.parseResult(response);
      if (!response.ok) {
        message.error({
          content: result.msg,
          key: url,
          duration: 2,
        });
        return;
      }
      message.success({ content: result.msg, key: url, duration: 2 });
      return result.data;
    } catch (error: any) {
      const errorMessage = this.dealError(error);
      clearTimeout(timeoutId);
      message.error({ content: errorMessage, key: url, duration: 2 });
    }
  }

  private dealError(error: any) {
    let errorMessage = "";
    switch (error.code) {
      case 20:
        errorMessage = this.t("http.error.timeout");
        break;
      default:
        errorMessage = this.t("http.error.unknown");
        break;
    }
    return errorMessage;
  }
}

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
  // signal: this.controller.signal,
};

const baseURL = import.meta.env.VITE_REST_BASE_URL;
const timeout = import.meta.env.VITE_REQUEST_TIMEOUT;
const tokenPrefix = import.meta.env.VITE_TOKEN_PREFIX;

export default new HttpRequest(baseURL, defaultOption, tokenPrefix, timeout);
