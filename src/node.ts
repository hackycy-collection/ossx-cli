import { loadConfigFromFile } from './config'

export async function bootstrap(configFile?: string): Promise<void> {
  await loadConfigFromFile(configFile)
}
