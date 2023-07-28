import Route from '@ioc:Adonis/Core/Route'
import './api_auth'

Route.group(() => {
    Route.group(() => {
        Route.resource('/', 'TicketsController').as("tickets.ressource").except(['edit', 'create'])
        Route.delete('/:id', 'TicketsController.destroy')
    }).prefix('/tickets')

    Route.group(() => {
        Route.resource('/', 'OrdersController').as("orders.ressource").except(['edit', 'create'])
        Route.delete('/:id', 'OrdersController.destroy')
        Route.group(() => {
            Route.post('/:id', 'OffersController.store')
            Route.get('/:id', 'OffersController.show')
            Route.post('/:id/accept', 'OffersController.accept')
            Route.delete('/:id/refuse', 'OffersController.destroy')
        }).prefix('/offers')
        Route.get('/:id/offers', 'OffersController.index')

        Route.get('/:id/offers/as-offer/:userId', 'OffersController.asOfferer')
        Route.get('/:id/offers/is-busied/:userId', 'OffersController.isBusied')
        Route.put('/:id/offers/busy', 'OffersController.busy')
    }).prefix('/orders')

    Route.group(() => {
        Route.resource('/', 'BanquesController').as("banques.ressource").except(['edit', 'create'])
        Route.put('/:id/add', 'BanquesController.add')
        Route.put('/:id/remove', 'BanquesController.remove')
        Route.delete('/:id', 'BanquesController.destroy')
    }).prefix('/banques')

    Route.group(() => {
        Route.get('/', 'UserSettingsController.index')
        Route.post('/', 'UserSettingsController.store')
        Route.put('/:id', 'UserSettingsController.update')
        Route.post('/:id/review', 'ReviewsController.store')
        Route.delete('/:id/review/:reviewId', 'ReviewsController.destroy')
    }).prefix('/users')
}).prefix('api/v1').middleware(['api'])