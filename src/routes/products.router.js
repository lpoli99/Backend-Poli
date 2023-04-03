import { Router } from "express"
import { ProductManagerMongo } from "../Daos/ProductManagerMongo.js"
import validation from "../middleware/validation.js"

const productManagerMongo = new ProductManagerMongo()
const router = Router()

router.get('/', async (req, res) => {
  const {limit, page = 1} = req.query
    try {
      let products = await productManagerMongo.getProducts(limit)
      res.status(200).send(products.docs)
    } catch (error) {
      console.log(error)
    }
})
  
  router.get('/:pid', async (req, res) => {
    const { pid } = req.params
  
    try {
      const productDb = await productManagerMongo.getProducts()
      const productById = await productManagerMongo.getProductById(pid)
      pid ? res.status(200).send(productById) : res.status(200).send(productDb)  
    } catch (error) {
      console.log(error)
    }
  })
  
  router.post('/', validation, async (req, res) => {
    const {title, description, price, thumbnail, code, stock, category, status} = req.body

    try {
      await productManagerMongo.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category, 
        status
      )
      res.status(201).send({message: 'Product added!'})
      
    } catch (error) {
      console.log(error)
    }
  })
  
  router.put('/:pid',validation, async (req, res) => {

    const { pid } = req.params
    const {title, description, price, thumbnail, code, stock, category, status} = req.body
    let product = {title, description, price, thumbnail, code, stock, category, status} 
    try {
      await productManagerMongo.updateProduct(pid, product)
      res.status(201).send({message: 'Product updated!'})    
    } catch (error) {
      console.log(error)
    }
  })
  
  router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
      await productManagerMongo.deleteProduct(pid)
      res.status(201).send({message: 'Product deleted!'})  
    } catch (error) {
      console.log(error)
    }
  })
  
export default router
