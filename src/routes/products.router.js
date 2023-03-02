import { Router } from "express"
import { ProductManager } from "../Daos/ProductManager.js"

// const Products = new ProductManager()
const productManager = new ProductManager()
const router = Router()

router.get('/', async (req, res) => {
    const { limit } = req.query
  
    try {
      const data = await productManager.getProducts()
  
      limit ? res.send(data.slice(0,limit)) : res.send(data)
    } catch (error) {
      console.log(error);
    }
  })
  
  router.get('/:pid', async (req, res) => {
    const { pid } = req.params
  
    try {
      const data = await productManager.getProducts()
  
      pid ? res.send(data.slice(pid - 1, pid)) : res.send(data)
    } catch (error) {
      console.log(error);
    }
  })
  
  router.post('/', async (req, res) => {
    const newItem = req.body
    newItem.status = true
  
    if (!newItem.title || !newItem.description || !newItem.price || !newItem.thumbnail || !newItem.code || !newItem.stock || !newItem.category)  {
      return res.send({mensaje: 'You must fill all empty spaces!'})
    }
    let productDb = await productManager.getProducts()
    const data = await productDb.find(product => product.code === newItem.code)
  
    if (data) {
       res.send({mensaje: 'The code to the product already exists!'})
    } else {
      try {
        await productManager.addProduct(newItem)
        res.send({mensaje: 'Product added!'})
      } catch (error) {
      console.log(error);
      }
    }
  })
  
  router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const newItem = req.body
  
    if (!newItem.title || !newItem.description || !newItem.price || !newItem.thumbnail || !newItem.code || !newItem.stock || !newItem.category)  {
      res.send({alerta: 'You must fill all empty spaces!'})
    } else {
      const prod = newItem
      try {
        await productManager.updateProduct(pid, prod)
        res.send({mensaje: 'Product updated!'})
      } catch (error) {
        console.log(error);
      }
    }
  })
  
  router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
  
    try {
      await productManager.deleteProduct(pid)
      res.send({mensaje: 'Product deleted!'})
    } catch (error) {
      console.log(error);
    }
  })
  
export default router
