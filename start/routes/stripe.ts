import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/webhook', 'WebhooksController.handle')
    
    // CB TEST: 4242424242424242
    Route.group(() => {
      Route.post('/checkout', 'WebhooksController.createCheckoutSession')
    }).prefix('create/').middleware(['auth', 'default'])
}).prefix('stripe/')
