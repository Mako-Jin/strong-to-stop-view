import { LocaleType } from "/@/enums/LocaleEnums";

export interface LocaleState {
  /**
   * 当前语言
   */
  currentLocale: string;
}

export interface LocaleModel {
  /**
   * 默认语言
   */
  defaultLocale: LocaleType;
}
