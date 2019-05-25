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
    const projects_domain_array: Array<string> = [
      'localhost',
      'local'
    ]
    projects_domain_array.forEach(domain => {
      const temp: string = (this.project_env_config() as any)['PROJECT_NAME']
      this.log('http://' + temp + '.' +domain)
    });
  
    notifier.notify({
      title: 'ARAL - ' + (this.project_env_config() as any)['PROJECT_NAME'],
      message: 'http://' + (this.project_env_config() as any)['PROJECT_NAME'] + '.localhost',
      open: 'http://' + (this.project_env_config() as any)['PROJECT_NAME'] + '.localhost'
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
        ).then(() =>{
          notifier.notify({
            title: 'ARAL',
            message: 'Docker is now running'
          })
        })
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
            return execa
              .shell(
                [
                  'source ' + this.system_env_file_path(),
                  'docker-compose -f ' + this.system_docker_compose_file_path() + ' up -d'
                ].join(' && ')
              )
              .then(() => {
                notifier.notify({
                  title: 'ARAL',
                  message: 'Common services are now running'
                })
              })
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
            const projects_urls_array = [
              'yubii.localhost',
              'yubii.local'
            ]
            return execa
              .shell(
                [
                  'source ' + this.system_env_file_path(),
                  'source ' + this.project_env_file_path(),
                  'export PROJECT_URLS=' + projects_urls_array.join(','),
                  'docker-compose -f ' + this.project_docker_compose_file_path() + ' up -d'
                ].join(' && ')
              )
              .then(() => {
                notifier.notify({
                  title: 'ARAL',
                  message: 'Project services are now running'
                })
              })
            }
        }
      ])
    }
  }

}

