import { UploadParams } from "../model/FileModel";
import httpRequest from "/@/utils/HttpUtils";

/**
 * 预览文件
 */
export const preview = (catalogId: string) => {
  return httpRequest.DOWNLOAD(`${"transfer/v1/preview/"}${catalogId}`);
};

/**
 * 检查文件标识符
 */
export const checkIdentifier = (params: UploadParams) => {
  return httpRequest.POST("transfer/v1/checkIdentifier", params);
};

/**
 * 初始化文件
 * @returns
 */
export const initiateFile = (params: UploadParams) => {
  return httpRequest.POST("fileMgr/v1/initiateFile", params);
};

/**
 * 上传文件
 */
export const uploadFile = (params: UploadParams) => {
  return httpRequest.UPLOAD("transfer/v1/upload", params);
};
