import { Router } from "express"
import { CartManager } from "../Daos/CartManager.js"

const Cart = new CartManager()
const router = Router()

router.get('/', async (req, res)=> {
    const cart = await Cart.getProducts()
    res.status(200).send(cart)
})

router.post('/', async (req, res) =>{
    const product = req.body
    const resp = await Cart.addProduct(product)
    res.status(200).send({
        resp,
        msg: 'Cart created'
    })
})

router.get('/:cid', async (req, res) =>{
    const products = await Cart.getProducts()
    const { cid } = req.params
    const productSearched = products.find(product => product.id === JSON.parse(cid))
    console.log(productSearched);
    if (!productSearched){
        return res.status(200).send('The requested product does not exist! ')
    }
    return res.send(productSearched)
})

router.post('/:cid/product/:pid', async (req, res) =>{
    const {cid, pid} = req.params
    const product = []
    product.push(pid)
    // const product
    // res.status(200).json({
    //     msg: 'Product added to cart',
    //     cid,
    //     pid
    // })
})

export default router