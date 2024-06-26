import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user as User

    if(!await hasPermission(user)) {
      response.redirect('/')
    }
    
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}

async function hasPermission(user: User) {
  const permissionsList = await user.related('permissions').query()
  const roles = await user.related('roles').query()

  return user.role == "admin" || roles.some((role) => role.name === "admin") || permissionsList.some((permission) => permission.name === 'dashboard:admin')
}