import { request } from "express"
import CartsService from "../services/cartsService.js"

const cartsService = new CartsService

class CartsController {
    createCart = async (req = request, res) => {
        await cartsService.createCart()

        res.send({message: "Cart Created!"})
    }

    getCartProducts = async (req = request, res) => {
        const { cid } = req.params
        const {limit = 1 , page = 1, query} = req.query
        try {
            const cartProducts = await cartsService.getCartProducts(cid, limit, page)
            
            res.send(cartProducts)
        } catch (error) {
            console.log(error)
        }
    }

    newProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.addProduct(cid, pid)

            res.send({message: "Product added to Cart!"})

        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.deleteProduct(cid, pid)

            res.send({message: "Product deleted from Cart!"})

        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.addProduct(cid, pid)

            res.send({message: "Product added to Cart!"})

        } catch (error) {
            console.log(error)
        }
    }

    deleteAllCartProducts = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.deleteAllCartProducts(cid)

            res.send({message: "All products deleted from Cart!"})

        } catch (error) {
            console.log(error)
        }
    }

    arrayProductsUpdate = async (req = request, res) => {
        const { cid } = req.params
        const data = req.body

        try {
            await cartsService.arrayProductsUpdate(cid, data)

            res.send({message: "Products array added to Cart!"})

        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsController