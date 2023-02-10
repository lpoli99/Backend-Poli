import { Router } from "express"
import ProductManager from "../Daos/ProductManager.js"

const Products = new ProductManager()
const router = Router()

router.get('/', async (req, res)=> {
    const products = await Products.getProducts()
    res.status(200).send(products)
})

router.get('/query', async (req, res) =>{
    const products = await Products.getProducts()
    const {limit} = req.query
    if (!limit) {
        return res.status(200).send(products)
    }
    
    let productsLimited = products.slice(products.length - limit)  

    res.status(200).send(productsLimited)
    
})

router.get ('/:pid', async (req, res) =>{
    const products = await Products.getProducts()
    const {pid} = req.params
    const productSearched = products.find(product => product.id === JSON.parse(pid))
    console.log(productSearched);
    if (!productSearched){
        return res.send('The requested product does not exist! ')
    }
    return res.send(productSearched)
})

router.post ('/', async (req, res) =>{
    const product = req.body
    const resp = await Products.addProduct(product)
    res.status(200).send({
        msg: resp,
        product
    })
})

router.put ('/:pid', async (req, res) =>{
    const { pid } = req.params
    
    let productToModified = req.body
    
    const productModified = await Products.updateProduct(pid, productToModified)
    
    res.status(200).send({
        productModified,
        message: 'Product Updated!'
    })
    
    
})

router.delete ('/:pid', async (req, res) =>{
    const { pid } = req.params
    
    const productToDelete = await Products.deleteProduct(pid)
    
    res.status(200).send({
        productToDelete,
        message: 'Product Deleted!'
    })
    
    
})



export default router
