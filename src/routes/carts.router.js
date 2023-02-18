import { Router } from "express"
import { CartManager } from "../Daos/CartManager.js"

const cartManager = new CartManager()
const router = Router()


router.post('/', async (req, res) =>{
    await cartManager.createCart()
    res.status(200).send({mensaje: 'Cart created!'})
})

router.get('/:cid', async (req, res) =>{
    const { cid } = req.params
    try {
        const cartProducts = await cartManager.getCartProducts(cid)
        res.status(200).send({mensaje: `List with cart's ${cid} products`,
                products: cartProducts.products})
    } catch (error) {
        console.log(error);
    }
})

router.post('/:cid/product/:pid', async (req, res) =>{
    const { cid, pid } = req.params
    try {
        await cartManager.addToCart(cid, pid)
        res.status(200).send({mensaje: 'Producto added to cart!'})
    } catch (error) {
        console.log(error);
    }
})

export default router