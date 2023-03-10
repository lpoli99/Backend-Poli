import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils/utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import { ProductManager } from './Daos/ProductManager.js'
import dbConnection from './config/conectionDb.js'
import chatModel from "./models/chat.model.js"

dbConnection()


const app = express()
const PORT = 8080 || process.env.PORT

const productManager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRouter)

const httpServer = app.listen(PORT, (err)=>{
    if (err) console.log(err)
    console.log(`Port ${PORT} Live!`)
})
httpServer.on
const io = new Server(httpServer)
let products  
let messages
io.on('connection', async socket => {
    console.log('New client conected!')
    try {
        products = await productManager.getProducts()
        messages = await chatModel.find()
        socket.emit('messageServer', products)
        socket.emit('messagesChat', products)
    } catch (error) {
        console.log(error)
    }

    socket.on('msg', async data =>{
        console.log(data)
        try {
            await chatModel.insertMany(data)
            let datas = await chatModel.find()
            io.emit('newMsg', datas)
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('product', async data => { 
        console.log('data: ', data)
        const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        } = data
        

        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
            console.log('You must fill all empty spaces!')
        }else{
            try {
                await productManager.addProduct(data)
                let datas = await productManager.getProducts()
                io.emit('productAdded', datas)
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('deleteProduct', async data => {
        try {
            await productManager.deleteProduct(data)
            let datas = await productManager.getProducts()
            io.emit('productDeleted', datas)
        } catch (error) {
            console.log(error)
        }
    })
})












