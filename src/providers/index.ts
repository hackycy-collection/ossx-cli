import type { OSSUploader, Provider } from '../types'
import { AliyunOSSUploader } from './aliyun'
import { CustomUploader } from './custom'
import { SSHUploader } from './ssh'

export function createUploader(provider: Provider): OSSUploader {
  switch (provider.name) {
    case 'ssh':
      return new SSHUploader(provider)
    case 'custom':
      return new CustomUploader(provider)
    case 'aliyun-oss':
      return new AliyunOSSUploader(provider)
    default:
      throw new Error(`Unsupported provider: ${(provider as any).name}`)
  }
}
