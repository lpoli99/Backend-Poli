const button = document.querySelector('#btnSubmit')

button.addEventListener('click', (e) =>{
    e.preventDefault()
    location.href = 'http://localhost:8080/products'
})