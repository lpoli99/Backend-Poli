import jwt from 'jsonwebtoken'
import { request } from "express"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import userService from "../services/userService.js"

const UserService = new userService

class UserController{
    roleSwitch = async (req = request, res) => {
        const {uemail} = req.params
        try {
            let user = await UserService.getUser(uemail)
            if (!user) res.send({status: 'error', message: 'User does not exist'})

            req.session.premium = !req.session.premium

            let newUser = await UserService.updateRole(uemail, `${req.session.premium ? 'premium' : 'user'}`)
            console.log(req.session.premium)
            res.send({status: 'ok', data: newUser})
            
        } catch (error) {
            
        }
    }

    changePassword = async (req = request, res) => {
        const { email, password } = req.body

        try {
            console.log('email: ', email)
            let user = await UserService.getUser(email)

            console.log('user: ', user)
            if (isValidPassword(user, password)) res.send('You cant use the same password')
            console.log('logre pasar')
            await UserService.updateUser(email, createHash(password))
            res.send('Password changed')
        } catch (error) {
            console.log(error)
        }
    }

    renderChangePassword = async (req = request, res) => {
        const {token} = req.params
        try {
            jwt.verify(token, config.privateKey, (error)=>{
                if(error){
                    res.redirect('http://localhost:8080/api/mail')
                }
                res.render('changePassword')
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserController