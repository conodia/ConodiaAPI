import type {ApplicationContract} from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {
  }

  public register() {
    // Register your own bindings
  }

  public async boot() {
  }

  public async ready() {
    if (this.app.environment === 'web') {
      const Socket = (await import('../start/socket')).default
      await new Socket(this.app).register()
      console.log('Socket is ready')
    }
    // App is ready
  }

  public async shutdown() { }
}
