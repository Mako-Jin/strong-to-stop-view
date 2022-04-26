const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isString(val: unknown): val is string {
  return is(val, "String");
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object");
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

export function isEmail(email: string): boolean {
  const reg =
    /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  return reg.test(email);
}

export function isPhoneNum(phone: string): boolean {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  return reg.test(phone);
}

export function fileIsImage(type: string): boolean {
  if (type === "image/jpeg" || type === "image/png") {
    return true;
  }
  return false;
}

export function checkChineseSymbol(value: string): boolean {
  const reg = /[^\x00-\xff]/g;
  return reg.test(value);
}
