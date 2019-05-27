import Command from '../base'

import fse = require('fs-extra')
import path = require('path')

export default class Init extends Command {
  static description = 'describe the command here'

  async run() {

    // Installo mysql-client
    // Installo rsync

    const system_env_file_folder = path.dirname(this.system_env_file_path())

    if (!fse.existsSync(system_env_file_folder)){
      fse.mkdirpSync(system_env_file_folder)
    }

    fse.copyFileSync(this.system_default_env_file_path(), this.system_env_file_path())

    // Copio aral.env

  }
}
