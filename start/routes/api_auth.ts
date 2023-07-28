import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/auth', 'WebsocketConnexionsController.connect')
}).prefix('api/v1')