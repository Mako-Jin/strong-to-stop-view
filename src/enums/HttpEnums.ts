/**
 * 请求方式
 */
export enum RequestMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * contentTyp
 */
export enum ContentTypeEnum {
  // text
  TEXT = "text/plain",
  // json
  JSON = "application/json",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded",
  // form-data  upload
  FORM_DATA = "multipart/form-data",
}
