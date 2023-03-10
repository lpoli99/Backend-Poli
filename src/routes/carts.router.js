import { Router } from "express"
import {CartManagerMongo} from "../Daos/CartManagerMongo.js"

const cartManagerMongo = new CartManagerMongo()
const router = Router()


router.post('/', async (req, res) =>{
    await CartManagerMongo.createCart()
    res.status(200).send({mensaje: 'Cart created!'})
})

router.get('/:cid', async (req, res) =>{
    const { cid } = req.params
    try {
        const cartProducts = await cartManagerMongo.getCartProducts(cid)
        res.status(200).send({mensaje: `Cart's ${cid} products`,
                products: cartProducts.products})
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cid/product/:pid', async (req, res) =>{
    const { cid, pid } = req.params
    try {
        await cartManager.addProduct(cid, pid)
        res.status(200).send({mensaje: 'Producto added to cart!'})
    } catch (error) {
        console.log(error)
    }
})

export default router