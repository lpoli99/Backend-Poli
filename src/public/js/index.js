const ioServer = io()
let productSub = document.querySelector('#submitProduct')
let title = document.querySelector('#title')
let description = document.querySelector('#description')
let code = document.querySelector('#code')
let price = document.querySelector('#price')
let inputStatus = document.querySelector('#status')
let stock = document.querySelector('#stock')
let category = document.querySelector('#category')
let thumbnail = document.querySelector('#thumbnail')
let productTitle = document.querySelector('#titleDelete')
let btnDelete = document.querySelector('#deleteProduct')
let container = document.querySelector('#container')

productSub.addEventListener('click', (event)=>{
    
    event.preventDefault()

    let product = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        inputStatus: inputStatus.value,
        stock: stock.value,
        category: category.value,
        thumbnail: thumbnail.value
    }

    ioServer.emit('product', product)
})

btnDelete.addEventListener('click', (event)=>{
    event.preventDefault()

    let productId = productTitle.value

    ioServer.emit('deleteProduct', productId)
})

ioServer.on('messageServer', data =>{
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `<div>
                                    <h4>${element.title}</h4>
                                        <p>${element.description}</p>
                                        <p>${element.category}</p>
                                        <p>${element.stock}</p>
                                        <p>${element.price}</p> 
                                        <p>${element.id}</p> 
                                </div>`
    })
})

ioServer.on('productAdded', data =>{
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `<div>
                                    <h4>${element.title}</h4>
                                    <p>${element.description}</p>
                                    <p>${element.category}</p>
                                    <p>${element.stock}</p>
                                    <p>${element.price}</p> 
                                </div>`
    })
})

ioServer.on('productDeleted', data =>{
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `<div>
                                    <h4>${element.title}</h4>
                                    <p>${element.description}</p>
                                    <p>${element.category}</p>
                                    <p>${element.stock}</p>
                                    <p>${element.price}</p> 
                                </div>`
    })
})