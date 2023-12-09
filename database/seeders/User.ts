import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import WebsocketClients from 'App/Models/WebsocketClients'
import User from 'App/Models/User'
import ServerSetting from "App/Models/ServerSetting";

export default class extends BaseSeeder {
    public async run() {
        await User.createMany([
            {
                username: 'Panda',
                email: 'Panda@gmail.com',
                password: '34Y2e8D8sJv6GHwvxPxR6e2',
                role: 'admin'
            }])


        const user = await User.findByOrFail('username', 'Panda')
        await user.related('permissions').sync([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25])


        await WebsocketClients.create({
            name: 'Bot 1',
            secret: "azeergreg5egreg2",
            id: "21",
            type: 'discord'
        })

        await WebsocketClients.create({
            name: 'Minecraft',
            secret: "azeergrzegzregzzeg5egreg2",
            id: "1",
            type: 'minecraft'
        })

        await ServerSetting.create({
            maintenanceMode: 'none',
            maintenanceMessage: '§cLe serveur est en maintenance.'
        })
    }
}
