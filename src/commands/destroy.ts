import Command from '../base'

import execa = require('execa')
import Listr = require('listr')
import * as notifier from 'node-notifier'

export default class Destroy extends Command {
  static description = 'describe the command here'

  async run() {
    this.system_env_config()
    this.project_env_config()
    await new Listr([
      this.project_destroyer()
    ]).run().catch(err => {
      console.error(err);
    })
  }

  project_destroyer(){
    return {
      title: 'Deleting',
      task: () => new Listr([
        {
          title: 'Project is dying',
          task: (ctx, task) => {
            const client_name = (this.project_env_config() as any)['PROJECT_GROUP'].replace(new RegExp('-', 'g'), '_')
            const project_name = (this.project_env_config() as any)['PROJECT_NAME'].replace(new RegExp('-', 'g'), '_')
            const cmd_string = [
              "export $(egrep -v '^#' " + this.system_env_file_path() + " | xargs)",
              "export $(egrep -v '^#' " + this.project_env_file_path() + " | xargs)",
              'export MYSQL_DATABASE=' + client_name + '__' + project_name + '__local',
              'docker-compose -f ' + this.project_docker_compose_file_path() + ' down'
            ].join(' && ');
            task.output = 'waiting for Project services goes down \n'
            return execa.shell(cmd_string)
          }
        }
      ])
    }
  }

}
