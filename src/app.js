
const express = require('express')
const products = require('../products.json')
const app = express()
const PORT = 8080

app.use(express.urlencoded({extended:true}))

app.get('/products', (req, res)=> {
    res.send(products)
})

app.get('/products/query', (req, res) =>{
    const {limit} = req.query
    if (!limit) {
        return res.send(products)
    }
    
    let productsLimited = products.splice(products.length - limit)  

    res.send(productsLimited)
    
})

app.get ('/products/:pid', (req, res) =>{
    const {pid} = req.params
    const productSearched = products.find(product => product.id === JSON.parse(pid))
    console.log(productSearched);
    if (!productSearched){
        return res.send('No existe el producto solicitado')
    }
    return res.send(productSearched)
})




app.listen(PORT, err =>{
    if (err) console.log(err)
    console.log(`Port ${PORT} Live!`)
})



