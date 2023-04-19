import {UserManagerMongo} from "../Dao/UserManagerMongo.js"

const userManagerMongo = new UserManagerMongo

class SessionsService {
    async getUser(email){
        return await userManagerMongo.getUser(email)
    }
}

export default SessionsService