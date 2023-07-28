import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.get('', async ({view}) => {
        return view.render('dashboard/index')
    }).as('dashboard.index')

    Route.group(() => {

        Route.get('/', 'BotsController.index')

        Route.get('/edit/:id', 'BotsController.updateView')
        Route.post('/edit/:id', 'BotsController.update').as('bot.update')

        Route.get('/create/', async ({view}) => {
            return view.render('dashboard/bots/create')
        }).as('dashboard.create.bot')

        Route.post('/create/', 'BotsController.store').as('bot.create')
        Route.get('/delete/:id', 'BotsController.delete')
    }).prefix('bots')

}).prefix('dashboard/').middleware(['auth', 'admin'])