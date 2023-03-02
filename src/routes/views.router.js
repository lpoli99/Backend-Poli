import { Router } from "express";
import { ProductManager } from "../Daos/ProductManager.js";

const router = Router()
const productManager = new ProductManager()

router.get('/products', async (req, res)=>{
    try {
        const products = await productManager.getProducts()
        let data = {
            products
        }
        res.render('home', data)

    } catch (error) {
        console.log(error)
    }
})

router.get('/', (req, res)=>{ // /realTimeProducts
    res.render('realTimeProducts')
})

export default router