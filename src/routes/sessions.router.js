import { Router } from "express"
import { UserManagerMongo } from "../Daos/UserManagerMongo.js"

const router = Router()
const userManagerMongo = new UserManagerMongo

router.get('/current', async (req, res) =>{
    try {
        let user = await userManagerMongo.getUser(req.session.email)
        console.log(user)
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
    }
})

export default router