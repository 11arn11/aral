import Command from '../base'

export default class Config extends Command {
  async run() {

    console.log('This is ARAL config')
    console.log('')
    
    console.log(this.system_env_config())

  }
}
