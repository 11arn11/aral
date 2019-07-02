import Command from '../base'

import execa = require('execa')
import Listr = require('listr')
import * as notifier from 'node-notifier'

export default class Start extends Command {
  async run() {
    this.system_env_config()
    this.project_env_config()
    await new Listr([
      this.docker_launcher(),
      this.system_launcher(),
      this.project_launcher()
    ]).run().catch(err => {
      console.error(err);
    })
    this.log('You can watch you project here')
    this.log('http://' + (this.project_env_config() as any)['WORKSPACE_BASE_URL'])
    notifier.notify({
      title: 'ARAL',
      subtitle: (this.project_env_config() as any)['PROJECT_NAME'],
      message: 'http://' + (this.project_env_config() as any)['WORKSPACE_BASE_URL'],
      icon: this.icon_folder_path('aral.png'),
      contentImage: this.project_icon_path(),
      open: 'http://' + (this.project_env_config() as any)['WORKSPACE_BASE_URL'],
      timeout: 10
    })

  }

  docker_launcher(){
    return {
      title: 'Docker',
      task: (ctx: any, task: { output: string; }) => {
        task.output = 'waiting for Docker to run'
        return execa.shell(
          'open --background -a Docker && \
          while ! docker system info > /dev/null 2>&1; do sleep 1; done && \
          docker system info'
        )
      }
    }
  }

  system_launcher(){
    return {
      title: 'ARAL',
      task: () => new Listr([
        {
          title: 'ARAL is starting',
          task: (ctx, task) => {
            task.output = 'waiting for ARAL to run'
            return execa.shell(
              [
                'source ' + this.system_env_file_path(),
                'docker-compose -f ' + this.system_docker_compose_file_path() + ' up -d'
              ].join(' && ')
            )
          }
        }
      ])
    }
  }

  project_launcher(){
    return {
      title: 'Project',
      task: () => new Listr([
        {
          title: 'Project is starting',
          task: (ctx, task) => {
            task.output = 'waiting for Project services to run'
            const client_name = (this.project_env_config() as any)['PROJECT_GROUP'].replace(new RegExp('-', 'g'), '_')
            const project_name = (this.project_env_config() as any)['PROJECT_NAME'].replace(new RegExp('-', 'g'), '_')
            return execa.shell(
              [
                "export $(egrep -v '^#' " + this.system_env_file_path() + " | xargs)",
                "export $(egrep -v '^#' " + this.project_env_file_path() + " | xargs)",
                'export MYSQL_DATABASE=' + client_name + '__' + project_name + '__local',
                'docker-compose -f ' + this.project_docker_compose_file_path() + ' up -d'
              ].join(' && ')
            )
          }
        }
      ])
    }
  }

}

