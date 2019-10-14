import Command from '../base'

import hostile = require('hostile')

export default class SetHost extends Command {

  static description = 'fix firefox issue adding a row in hosts file'

  async run() {

    const workspace_baseurl = (this.project_env_config() as any)['WORKSPACE_BASE_URL']

    this.log('workspace url:' + workspace_baseurl)

    hostile.set('127.0.0.1', workspace_baseurl)

    this.log('fatto:' + workspace_baseurl)

  }
}
