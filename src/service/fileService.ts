import { preview } from "/@/apis/fileApi";

/**
 * 转换后端的字节流为缓存地址
 * @param catalogId
 */
export async function getPreviewImage(catalogId: string): Promise<string> {
  const result = await preview(catalogId).then((res) => {
    return res;
  });
  const imgUrl = URL.createObjectURL(result);
  return imgUrl;
}
