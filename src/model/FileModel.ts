export interface FileItem extends File {
  percent?: number;
  file: Blob;
  status: string;
  catalogId?: string;
  uid?: string;
  identifier?: string;
}

export interface FileSliceModel {
  /**
   * 分片文件
   */
  files?: Blob;
  /**
   * 总分片数量
   */
  chunkCounts?: number;
  /**
   * 当前为第几块分片
   */
  currentChunk?: number;
  /**
   * 块大小
   */
  chunkSize?: number;
  /**
   * 标识符，md5码
   */
  identifier: string;
  /**
   * 当前分片大小
   */
  currentChunkSize?: number;
  /**
   * 文件总大小
   */
  totalSize: number;
}

export interface UploadParams extends FileSliceModel {
  /**
   * 目标文件夹路径，fileId
   */
  parentId: string;
  /**
   * 原始文件名
   */
  originalFilename?: string;
  /**
   * 文件类型
   */
  fileType?: string;
  /**
   * 存储类型
   */
  dbType?: number;
}
