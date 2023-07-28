import { Server } from 'ws'
import { ServerContract } from '@ioc:Adonis/Core/Server'

export default class Ws {
  public io: Server
  private booted = false

  constructor(protected server: ServerContract) {
    if (this.booted) {
      return
    }
    this.io = new Server({
      port: 3334,
    })
    
    this.booted = true
  }
}