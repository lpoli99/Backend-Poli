import { Router } from "express";
import { ProductManagerMongo } from "../Daos/ProductManagerMongo.js"
import { CartManagerMongo } from "../Daos/CartManagerMongo.js"

const router = Router()

const productManagerMongo = new ProductManagerMongo
const cartManagerMongo = new CartManagerMongo

router.get('/products', async (req, res)=>{
    const {limit = 1, page = 1, query} = req.query
    let filter = {}
    query ? filter = {category: query} : filter = {}
    try {
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await productManagerMongo.getProducts(limit, page, filter)
        let data = { products: docs, hasPrevPage, hasNextPage, prevPage, nextPage, page, limit, query}
        res.render('home', data)
    } catch (error) {
        console.log(error)
    }
})

router.get('/carts/:cid', async (req, res) =>{

    const {cid} = req.params

    const {limit = 1 , page = 1} = req.query

    console.log(limit)

    try {
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await cartManagerMongo.getCartProducts(cid, limit, page)
        let data = docs[0].products
        let datas = {
            products: data,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            limit
        }
        res.render('carts', datas)
    } catch (error) {
        console.log(error)
    }
})

router.get('/chat', (req, res)=>{
    res.render('chat')
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})

export default router