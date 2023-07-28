import Ws from 'App/Services/Ws'
import type {ApplicationContract} from '@ioc:Adonis/Core/Application'
import {WebSocket} from 'ws'
import Message from 'App/Services/modules/Messages'
import Auth from 'App/Services/modules/Auth'

let websocket: Ws

export default class Socket {
  private app: ApplicationContract

  constructor(protected application: ApplicationContract) {
    this.app = application
  }

  public async register(): Promise<void> {
    websocket = new Ws(this.app.container.use('Adonis/Core/Server'))

    websocket.io.on('connection', async (socket) => {
      await this.registerModules(socket)
    })

    websocket.io.on('error', (error) => {
      console.log(error)
    })


  }

  private async registerModules(socket: WebSocket): Promise<void> {
    await Message.execute(socket)
    await Auth.execute(socket)
 //   await Heartbeat.execute(socket)
  }
}

export { websocket }

