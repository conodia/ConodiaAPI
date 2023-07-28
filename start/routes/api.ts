import Route from '@ioc:Adonis/Core/Route'
import './api_auth'

Route.group(() => {
    Route.group(() => {
        Route.post('/create', 'VerificationsController.create')
        Route.post('/verify/:id/:code', 'VerificationsController.verify')
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
    }).prefix('/invites')

    Route.group(() => {
        Route.resource('/', 'PlayersController').as("players.ressource").except(['edit', 'create'])
        Route.delete('/:id', 'PlayersController.destroy')
    }).prefix('/players')

    Route.group(() => {
        Route.post('/create', 'VerificationsController.create').as("link.create")
        Route.post('/verify/:id', 'VerificationsController.verify').as("link.verify")
        Route.get('/islink/:id', 'VerificationsController.isLink').as("link.islink")
        Route.delete('/unlink/:id', 'VerificationsController.unlink').as("link.destroy")
    }).prefix("/link")

    Route.group(() => {
        Route.post('/create', 'RushGamesController.create').as("rushgame.create")
        Route.post('/addchannels/:id', 'RushGamesController.addChannels').as("rushgame.addchannels")
        Route.delete('/:id', 'RushGamesController.destroy').as("rushgame.destroy")
    }).prefix("/rush")

}).prefix('api/v1').middleware(['api'])