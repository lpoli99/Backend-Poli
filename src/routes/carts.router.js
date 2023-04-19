import { Router } from "express"
import CartsController from "../controllers/cartsController.js"

const router = Router()
const cartsController = new CartsController


router.post('/', cartsController.createCart)

router.get('/:cid', cartsController.getCartProducts)

router.post('/:cid/product/:pid', cartsController.newProduct)

router.delete('/:cid/product/:pid', cartsController.deleteProduct)

router.put('/:cid/product/:pid', cartsController.addProduct)

router.delete('/:cid', cartsController.deleteAllCartProducts)

router.put('/:cid', cartsController.arrayProductsUpdate)

export default router