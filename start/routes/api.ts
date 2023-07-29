import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.group(() => {
        Route.post('/create', 'VerificationsController.create')
        Route.get('/verify/:id/:code', 'VerificationsController.verify')
    }).prefix('/verification')

    Route.group(() => {
        Route.resource('/', 'GiveawaysController').as("giveaway.ressource").except(['edit', 'create'])
        Route.post('/:id/addmember', 'GiveawaysController.addMember')
        Route.delete('/:id', 'GiveawaysController.destroy')
    }).prefix('/giveaways')

    Route.group(() => {
        Route.resource('/', 'BlacklistsController').as("blacklist.ressource").except(['edit', 'create'])
        Route.delete('/:id', 'BlacklistsController.destroy')
    }).prefix('/blacklists')

    Route.group(() => {
        Route.resource('/', 'TicketsController').as("tickets.ressource").except(['edit', 'create'])
        Route.delete('/:id', 'TicketsController.destroy')
    }).prefix('/tickets')

    Route.group(() => {
        Route.resource('/', 'InvitesController').as("invites.ressource").except(['create'])
        Route.put("/:id", "InvitesController.edit")
        Route.post("/:id/addinvite", "InvitesController.addInvite")
        Route.delete('/:id/removeinvite/:userId', 'InvitesController.removeInvite')
        Route.delete('/:id', 'InvitesController.destroy')
        Route.delete('/:id/reset', 'InvitesController.reset')
    }).prefix('/invites')

    Route.group(() => {
        Route.post('/create', 'VerificationsController.create').as("link.create")
        Route.post('/verify/:id', 'VerificationsController.verify').as("link.verify")
        Route.get('/islink/:id', 'VerificationsController.isLink').as("link.islink")
        Route.delete('/unlink/:id', 'VerificationsController.unlink').as("link.destroy")
    }).prefix("/link")

    Route.group(() => {
        Route.post('/', 'StaffConnexionsController.create').as("staffconnexion.create")
        Route.delete('/:id', 'StaffConnexionsController.delete').as("staffconnexion.delete")
    }).prefix("/staffconnexion")
}).prefix('api/v1').middleware(['api'])