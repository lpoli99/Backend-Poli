import { UserManagerMongo } from "../Dao/UserManagerMongo.js"
import {UserDTO} from "../DTO/userDto.js"

const userDTO = new UserDTO
const userManagerMongo = new UserManagerMongo

class UserService{
    async adduser(user){
        try {
            let userr = await userDTO.user(user)
            return await userManagerMongo.addUser(userr)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(){
        try {
            let users = await userManagerMongo.getUsers()
            return users
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(email){
        try {
            let emailUser = await userDTO.userByEmail(email)
            let user = await userManagerMongo.getUser(emailUser)
            return user
        } catch (error) {
            console.log(error)
        }
    }
}
export default UserService
