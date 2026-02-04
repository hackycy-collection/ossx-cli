import { loadConfigFromFile } from './config'
import { upload } from './upload'

export async function bootstrap(configFile?: string): Promise<void> {
  const cfg = await loadConfigFromFile(configFile)
  await upload(cfg)
}
