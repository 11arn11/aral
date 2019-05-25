import Command from '../base'

import execa = require('execa')
import Listr = require('listr')
import * as notifier from 'node-notifier'

export default class DestroyAll extends Command {
  async run() {

    new Listr([
      {
        title: 'Stop all container',
        task: () => execa.shell('docker stop --time 30 $(docker ps -aq)')
      },
      {
        title: 'Remove all container',
        task: () => execa.shell('docker rm $(docker ps -aq)'),
      },
      {
        title: 'Remove all volumes',
        task: () => execa.shell('docker volume prune -f')
      },
      {
        title: 'Remove all network',
        task: () => execa.shell('docker network prune -f')
      }
    ]).run().catch(err => {
      console.error(err);
    })

  }
}
