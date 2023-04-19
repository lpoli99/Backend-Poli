import { request } from "express"
import ProductsService from "../services/productsService.js"

const productsService = new ProductsService

class ProductsController {
    getProducts = async (req = request, res) => {
        const {limit, page = 1} = req.query
        try {
            let data = await productsService.getProducts(limit)

            res.send(data.docs)
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (req = request, res) => {
        const {pid} = req.params
        try {
            const allProducts = await productsService.getProducts()
            const productById = await productsService.getProductById(pid)

            pid ? res.send(productById) : res.send(allProducts)
        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async (req = request, res) => {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        try {
            await productsService.addProduct(title, description, code, price, status, stock, category, thumbnail)

            res.send({aviso: "Product added!"})
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (req = request, res) => {
        const {pid} = req.params
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        let  obj =  { title, description, code, price, status, stock, category, thumbnail }
        try {
            await productsService.updateProduct(pid, obj)

            res.send({aviso: "Product updated!"})
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req = request, res) => {
        const {pid} = req.params
        try {
            await productsService.deleteProduct(pid)

            res.send({aviso: "Product deleted!"})
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductsController