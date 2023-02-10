import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import ProductManager from './Daos/ProductManager.js'

const app = express()
const PORT = 8080

const productManager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public' ,express.static(__dirname + '/public'))

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
const socketServer = new Server(httpServer)
let products
socketServer.on('connection', async socket => {
    console.log('New client conected!')
    try {
        products = await productManager.getProducts()
        socket.emit('messageServer', products)
    } catch (error) {
        console.log(error)
    }

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

        if (title == '' || description == '' || code == '' || price == '' || status == '' || stock == '' || category == '') {
            console.log('todo mal');
        }else{
            try {
                await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category)
                let datos = await productManager.getProducts()
                socketServer.emit('productoAgregado', datos)
            } catch (error) {
                console.log(error)
            }
        }
    })

        try {
            await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category)
            let data = await productManager.getProducts()
            socketServer.emit('productAdded', data)
        } catch (error) {
            console.log(error)
        }
        
    

    socket.on('deleteProduct', async data => {
        try {
            await productManager.deleteProduct(data)
            let datos = await productManager.getProducts()
            socketServer.emit('productDeleted', datos)
        } catch (error) {
            console.log(error)
        }
    })
})












