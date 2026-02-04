import type { UserConfig, UserProviderConfig, UserProviderMultiConfig } from './config'
import type { OSSFile, Provider } from './types'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import mime from 'mime-types'
import { glob } from 'tinyglobby'
import { combineURLs } from './utils'

/**
 * upload oss files
 */
export async function upload(config: UserConfig): Promise<void> {
  let provider: Provider | undefined

  if (Reflect.has(config, 'provider')) {
    provider = (config as UserProviderConfig).provider
  }
  else if (Reflect.has(config, 'providers')) {
    const providers = (config as UserProviderMultiConfig).providers
    if (providers.length === 1) {
      provider = providers[0].provider
    }
    else if (providers.length > 1) {
      // prompt select provider
      // TODO
    }
  }

  if (!provider) {
    throw new Error('No provider configured')
  }

  if (!config.target) {
    throw new Error('Target directory is required')
  }

  const targetDir = path.resolve(config.target)

  if (!fs.existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`)
  }

  // Define patterns to include/exclude
  const patterns = Array.isArray(config.includeFiles) ? config.includeFiles : ['**/*']
  const ignorePatterns = Array.isArray(config.ignoreFiles) ? config.ignoreFiles : undefined

  // Get all files in the target directory
  const globFiles = await glob(patterns, {
    cwd: targetDir,
    ignore: ignorePatterns,
    dot: true,
    absolute: false,
    onlyFiles: true,
  })

  // calc maxWorkers
  const maxWorkers = config.maxWorkers && config.maxWorkers > 0 ? config.maxWorkers : os.cpus().length

  const ossFiles: OSSFile[] = globFiles.map((globFile) => {
    const localFilePath = path.join(targetDir, globFile)

    const filename = path.basename(localFilePath)
    const mimeType = mime.lookup(filename)
    const contentType = mime.contentType(filename)

    // Calculate the remote path - OSS always uses forward slashes (/) regardless of OS
    // Normalize the path to ensure consistent handling across platforms
    const normalizedPath = globFile.split(path.sep).join('/')
    const remoteFilePath = config.destination ? combineURLs(config.destination, normalizedPath) : normalizedPath

    return {
      localFilePath,
      remoteFilePath,
      filename,
      mimeType: mimeType || undefined,
      contentType: contentType || undefined,
    }
  })

  // split files into batches based on maxWorkers
  const batches: OSSFile[][] = []
  for (let i = 0; i < ossFiles.length; i += maxWorkers) {
    batches.push(ossFiles.slice(i, i + maxWorkers))
  }

  console.log(`Uploading files using provider: ${provider.name}`, batches, maxWorkers)
}
