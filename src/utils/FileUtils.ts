import SparkMD5 from "spark-md5";
import { FileItem, FileSliceModel } from "/@/model/FileModel";

/**
 * 分割文件
 * @param file
 * @param piece
 */
export async function sliceFile(
  file: FileItem,
  onProgress: (event: { percent: number }, file: FileItem) => void,
  chunkSize = 1024 * 1024 * 2
) {
  const pieceList: FileSliceModel[] = [];
  // 文件总大小
  const totalSize = file.size;
  // 计算文件切片总数
  const totalSlice = Math.ceil(totalSize / chunkSize);
  for (let i = 0; i < totalSlice; i++) {
    const piece = file.slice(i * chunkSize, (i + 1) * chunkSize);
    const fileItem = Object.assign({}, file, { file: piece, size: piece.size });
    const identifier = await computeMD5(fileItem).then(
      (res: FileItem): string => {
        return res.identifier as string;
      }
    );
    pieceList.push({
      files: piece,
      chunkCounts: totalSlice,
      currentChunk: i + 1,
      chunkSize: chunkSize,
      identifier: identifier,
      currentChunkSize: piece.size,
      totalSize: totalSize,
    });
    onProgress(
      {
        percent: Math.round(10 + ((i + 1) / totalSlice) * 10),
      },
      file
    );
  }
  return pieceList;
}

export function computeMD5(
  file: FileItem,
  onProgress?: any,
  chunkSize = 1024 * 1024 * 2
): Promise<FileItem> {
  return new Promise(function (resolve, reject) {
    const blobSlice =
      File.prototype.slice ||
      (File.prototype as any).mozSlice ||
      (File.prototype as any).webkitSlice;
    const chunks = Math.ceil(file.size / chunkSize); // 分块数
    let currentChunk = 0; // 当前块
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      spark.append((e.target as any).result); // Append array buffer
      if (currentChunk < chunks) {
        currentChunk++;
        loadNext();
      } else {
        const md5 = spark.end(); // 得到md5
        spark.destroy(); // 释放缓存
        file.identifier = md5; // 将文件md5赋值给文件唯一标识
        resolve(file);
      }
    };

    fileReader.onerror = () => {
      reject("oops, something went wrong.");
    };

    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end =
        start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      onProgress(
        {
          percent: Math.round(((currentChunk + 1) / chunks) * 10),
        },
        file
      );
    };
    loadNext();
  });
}
