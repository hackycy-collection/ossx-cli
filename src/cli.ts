import { cac } from 'cac'
import { version } from '../package.json'

const cli = cac('ossx')

// global options
interface GlobalCLIOptions {
  '--'?: string[]
  'config'?: string
}

cli
  .command('', 'run')
  .option('-c, --config <file>', `[string] use specified config file`)
  .action(async (_options: GlobalCLIOptions) => {
    // TODO
  })

cli.help()
cli.version(version)

cli.parse()
