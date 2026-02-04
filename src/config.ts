import type { OssOptions } from './types'
import path from 'node:path'
import process from 'node:process'
import { loadConfig } from 'unconfig'

export interface UserConfig extends OssOptions { }

export interface LoadedConfigResult {
  config: UserConfig
  configFile?: string
}

export function defineConfig(config: UserConfig): UserConfig {
  return config
}

const defaultOssOptions: OssOptions = {
  providers: [],
  target: 'dist',
  removeWhenUploaded: false,
  abortOnFailure: false,
  logger: true,
  logDir: path.resolve('node_modules', '.ossx'),
  retryTimes: 3,
}

export async function loadConfigFromFile(configFile?: string): Promise<LoadedConfigResult> {
  const resolvedPath = configFile ? path.resolve(configFile) : undefined
  const extensions = ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json']

  const { config } = await loadConfig<UserConfig>({
    cwd: process.cwd(),
    sources: resolvedPath
      ? [
          { files: resolvedPath },
        ]
      : [
          { files: 'ossx.config', extensions },
        ],
    defaults: defaultOssOptions,
  })

  return {
    config,
    configFile: resolvedPath,
  }
}
