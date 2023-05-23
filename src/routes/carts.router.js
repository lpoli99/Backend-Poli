import { Router } from "express"
import CartsController from "../controllers/cartsController.js"
import { roleUserVerify, rolePremiumVerify } from "../middleware/roleVerify.js"
import productIdVali from "../middleware/productIdVali.js"

const router = Router()
const cartsController = new CartsController


router.post('/', cartsController.createCart)

router.get('/:cid', cartsController.getCartProducts)

router.post('/:cid/product/:pid', rolePremiumVerify, productIdVali, roleUserVerify, cartsController.newProduct)

router.delete('/:cid/product/:pid', roleUserVerify, cartsController.deleteProduct)

router.put('/:cid/product/:pid', cartsController.addProduct)

router.delete('/:cid', cartsController.deleteAllCartProducts)

router.put('/:cid', cartsController.arrayProductsUpdate)

router.get('/:cid/purchase', cartsController.createTicket)

export default router