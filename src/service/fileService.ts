import { computeMD5, sliceFile } from "/@/utils/FileUtils";
import {
  checkIdentifier,
  initiateFile,
  preview,
  uploadFile,
} from "/@/apis/fileApi";
import { FileItem, UploadParams } from "/@/model/FileModel";
import { ResultModel } from "/@/model/HttpModel";

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

/**
 * 分片上传
 */
export async function sliceUpload(
  file: FileItem,
  onProgress: (event: { percent: number }, file: FileItem) => void,
  onSuccess: () => void,
  onError: (event: Error) => void
) {
  // 计算整个文件的Hash散列值
  const fileItem = await computeMD5(file, onProgress).then(
    (fileItem: FileItem) => {
      return fileItem;
    }
  );
  // 封装请求参数
  const uploadFileParam = {
    parentId: "",
    originalFilename: fileItem.name,
    fileType: fileItem.type,
    totalSize: file.size,
    identifier: fileItem.identifier as string,
  };
  // 检查文件状态，是否满足秒传条件，
  // 如果满足返回的是新的文件对象，
  // 如果不满足,返回未上传，或者部分未完成的分片list
  const checkIdentifierResult = await checkIdentifier(uploadFileParam).then(
    (res) => {
      return res[0];
    }
  );
  if (checkIdentifierResult.uploadComplete) {
    onSuccess();
    return checkIdentifierResult.catalogId;
  }
  const catalogId = await doSliceUpload(
    file,
    uploadFileParam,
    onProgress,
    onSuccess,
    onError
  ).then((res) => {
    return res;
  });
  return catalogId;
}

/**
 * 分片上传
 * @param file
 */
async function doSliceUpload(
  file: FileItem,
  uploadFileParam: UploadParams,
  onProgress: (event: { percent: number }, file: FileItem) => void,
  onSuccess: () => void,
  onError: (event: Error) => void
) {
  const chunkList = await sliceFile(file, onProgress);
  const catalogId = await initiateFile(
    Object.assign(uploadFileParam, {
      chunkCounts: chunkList.length,
      chunkSize: 2 * 1024 * 1024,
    })
  ).then((res) => {
    return res[0];
  });

  for (let i = 0; i < chunkList.length; i++) {
    const params = Object.assign(uploadFileParam, {
      catalogId: catalogId,
      files: chunkList[i].files,
      currentChunk: chunkList[i].currentChunk,
      identifier: chunkList[i].identifier,
      currentChunkSize: chunkList[i].currentChunkSize,
    });
    await uploadFile(params)
      .then((res: ResultModel) => {
        const result = res[0];
        if (result.uploadComplete) {
          onSuccess();
          return result.catalogId;
        }
        onProgress(
          {
            percent: Math.round(
              20 +
                ((chunkList.length - res.data[0].missChunks.length) /
                  chunkList.length) *
                  80
            ),
          },
          file
        );
      })
      .catch((error) => {
        onError(error);
      });
  }
  return catalogId;
}
