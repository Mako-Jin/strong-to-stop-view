export interface ResultModel<T = any> {
  code: number;
  success: boolean;
  msg: string;
  data: T;
}
