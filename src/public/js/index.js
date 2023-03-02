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

let user
let chatbox = document.getElementById('chatBox')

Swal.fire({
    title: 'Identifícate',
    input: 'text',
    text: 'ingrese un usuario para identificarse.',
    // icon: 'success',
    inputValidator: value => {
        return !value && 'Necesitas escribir un nombre de usuario para continuar.'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    ioServer.emit('authenticated', user)
})

const handleSocket = evt => {
    if (evt.key === "Enter") {
        if (chatbox.value.trim().length > 0) {
            ioServer.emit('message', {
                user,
                message: chatbox.value
            })
            chatbox.value = ''
        }
    }
}

chatbox.addEventListener('keyup', handleSocket)

ioServer.on('messageLogs', data => {
    let log = document.getElementById('messageLogs')
    let messages = ''
    data.forEach(mensajes =>{
        messages = messages + `<li>${mensajes.user} dice: ${mensajes.message}</li> <br>`
    })
    log.innerHTML = messages
})

ioServer.on('newUserConnected', data =>{
    console.log(data)
    if (!user) return
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        title: `${data} se a conectado!`,
        icon: "success"
    })
        
    
})


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

