import type { OssOptions, Provider, ProviderConfigItem } from './types'
import path from 'node:path'
import process from 'node:process'
import { loadConfig } from 'unconfig'

export interface UserProviderConfig extends OssOptions {
  provider: Provider
}

export interface UserProviderMultiConfig extends OssOptions {
  providers: ProviderConfigItem[]
}

export type UserConfig = UserProviderConfig | UserProviderMultiConfig

export interface LoadedConfigResult {
  config: UserProviderConfig | UserProviderMultiConfig
  configFile?: string
}

export function defineConfig(config: UserConfig): UserConfig {
  return config
}

const defaultOssOptions: OssOptions = {
  target: 'dist',
  removeWhenUploaded: false,
  abortOnFailure: false,
  logger: true,
  logDir: path.resolve('node_modules', '.ossx'),
  retryTimes: 3,
}

export async function loadConfigFromFile(configFile?: string): Promise<UserConfig> {
  const resolvedPath = configFile ? path.resolve(configFile) : undefined
  const extensions = ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json']

  const { config } = await loadConfig<Partial<UserConfig>>({
    cwd: process.cwd(),
    sources: resolvedPath
      ? [
          { files: resolvedPath },
        ]
      : [
          { files: 'ossx.config', extensions },
        ],
    defaults: defaultOssOptions,
    merge: true,
  })

  return config as UserConfig
}
