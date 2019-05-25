import Command from '../base'

import fse = require('fs-extra')

export default class Init extends Command {
  static description = 'describe the command here'

  async run() {

    // Installo mysql-client
    // Installo rsync

    fse.copyFileSync(this.system_default_env_file_path(), this.system_env_file_path())


    // Copio aral.env

  }
}
