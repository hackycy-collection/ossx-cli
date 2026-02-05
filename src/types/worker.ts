import type { Provider } from './providers'
import type { OSSFile, OssOptions } from './uploader'

export type UploadOptions = OssOptions & { provider: Provider }

export interface WorkerProgress {
  total: number
  current: number
  currentFile: OSSFile
}

export interface TaskResult {
  total: number
  succeeded: number
}

// 工作进程消息类型
export type WorkerMessageType = 'PROGRESS' | 'COMPLETE' | 'ERROR'

// 工作进程消息接口
export interface WorkerMessage {
  type: WorkerMessageType
  workerId?: number
  error?: any
  progress?: WorkerProgress
  result?: TaskResult
}
