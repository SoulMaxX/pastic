import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class UsersController {
    
    async login ({auth,request,session,response}: HttpContextContract){
        const username = request.input('username')
        const password = request.input('password')
        
        try{
            await auth.attempt(username,password)
            response.redirect().toRoute('product')
        }
        catch(error){
            session.flash('error','The user is not authorized!')
            response.redirect().toRoute('login')
        }
    }

    async register ({request,session,response}: HttpContextContract){
        const payload = await request.validate(RegisterUserValidator)
        const user = await User.create({username: payload.username, password: payload.password})
        session.flash('message', 'The user is registered successfully. Please use username and password to login!')
        response.redirect().toRoute('login')
    }
    async logout({auth, response}: HttpContextContract){
        await auth.use('web').logout()
        response.redirect().toRoute('login')
    }

}




