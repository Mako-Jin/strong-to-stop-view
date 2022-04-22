import httpRequest from "/@/utils/HttpUtils";

/**
 * 预览文件
 */
export const preview = (catalogId: string) => {
  return httpRequest.DOWNLOAD(`${"transfer/v1/preview/"}${catalogId}`);
};
