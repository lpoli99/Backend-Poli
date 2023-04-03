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
    const {limit = 1, page = 1, query} = req.query
    try {
        const cartProducts = await cartManagerMongo.getCartProducts(cid, limit, page)
        res.status(200).send(cartProducts)
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cid/product/:pid', async (req, res) =>{
    const { cid, pid } = req.params
    try {
        await cartManagerMongo.addProduct(cid, pid)
        res.status(200).send({mensaje: 'Product added to cart!'})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        await cartManagerMongo.deleteProduct(cid, pid)
        res.status(200).send({mensaje: 'Product deleted of cart!'})
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid/product/:pid', async (req, res) =>{
    const { cid, pid } = req.params
    try {
        await cartManagerMongo.addProduct(cid, pid)
        res.status(200).send({mensaje: 'Product added to cart!'})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid', async (req, res) =>{
    const { cid } = req.params
    try {
        await cartManagerMongo.deleteAllCartProducts(cid)
        res.status(200).send({mensaje: 'All products deleted of cart!'})
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid', async (req, res) => {
    const {cid} = req.params
    const data = req.body
    try {
        await cartManagerMongo.productArrayUpdate(cid, data)
        res.status(200).send({mensaje: 'Product array added to cart!'})
    } catch (error) {
        console.log(error)
    }
})

export default router