import usersModel from "../models/users.model.js"

export class UserManagerMongo{

    addUser = async (user) =>{
        try {
            return await usersModel.create(user)
        } catch (error) {
            console.log(error)
        }
    }

    getUsers = async() =>{
        try {
            let users = await usersModel.find()
            return users
        } catch (error) {
            console.log(error)
        }
    }

    getUser = async(email) =>{
        try {
            let user = await usersModel.findOne({email: email})
            return user
        } catch (error) {
            console.log(error)
        }
    }
}