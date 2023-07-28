import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.group(() => {
        Route.get('', async ({ view }) => {
            return view.render('auth/login')
        }).as('login')

        Route.post('', 'Users/AuthController.login')
    }).prefix('login')
}).middleware(['guest']).prefix('/auth/')

Route.get('/auth/logout', 'Users/AuthController.logout').as('logout').middleware(['auth'])
Route.get('profile', 'ProfilesController.index').as('profile').middleware(['auth'])