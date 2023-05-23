import usersModel from "./models/users.model.js"

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

    updateUser = async(email, password) =>{
        try {
            console.log('MongoUserDAO')
            console.log('email MongoUserDAO: ', email)
            console.log('password MongoUserDAO: ', password)
            let user = await usersModel.findOne({email: email})
            let changeUser = {
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                role: user.role,
                email: user.email,
                cart: user.cart,
                password: password
            }
            console.log('user: ', user)
            console.log('user.password: ', user.password)
            await usersModel.findOneAndDelete({_id: user._id})
            console.log('User deleted!')
            let newUser = await usersModel.create(changeUser)
            console.log('newUser: ', newUser)
            return newUser
        } catch (error) {
            console.log(error)
        }
    }

    updateRole = async(email, role) =>{
        try {
            let user = await usersModel.updateOne(
                {email: email},
                {$set: {'role': role}}
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }
}
