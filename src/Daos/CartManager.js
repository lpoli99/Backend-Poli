import fs from 'fs'

export class CartManager {
  #route = '../carts.json'
    constructor() {
        this.path = this.#route
        this.cart = [];
    }

    getCartProducts = async (cid) => {
      try {
        if (fs.existsSync(this.path)) {
          let dB = await fs.promises.readFile(this.path, 'utf-8')
          let products = JSON.parse(dB);
          let cart = products[parseInt(cid) - 1]
          return cart;
        }
        await fs.promises.writeFile(this.path, '[]', 'utf-8')
        return ['Your cart is empty!']
      } catch (error) {
        console.log(error);
      }
    }
  
    createCart = async () => {
      let cart = {}
  
      if(fs.existsSync(this.path)) {
        let dB = await fs.promises.readFile(this.path, 'utf-8')
        let cartsDb = JSON.parse(dB)
  
        cart.id = cartsDb[cartsDb.length -1].id + 1
        cart.products = []
        cartsDb.push(cart)
  
        await fs.promises.writeFile(this.path, `${JSON.stringify(cartsDb, null, '\t')}`, 'utf-8')
      } else {
        cart.id = 1
        cart.products = []
        const arrayCart = [cart]
  
        await fs.promises.writeFile(this.path, `${JSON.stringify(arrayCart, null, '\t')}`, 'utf-8')
      }
    }
  
    addToCart = async (cid, pid) => {
      try {
        let dB = await fs.promises.readFile(this.path, 'utf-8')
        let cartsDb = JSON.parse(dB)
        let cart = cartsDb[parseInt(cid) - 1]
        const idx = cart.products.findIndex(product => product.id === parseInt(pid))
        if (idx !== -1) {
          let product = cart.products[idx]
          console.log(product);
          product.quantity++
          cart.products[idx] = product
        } else {
          let product = {}
          product.id = parseInt(pid)
          product.quantity = 1
          cart.products = [...cart.products, product]
        }
  
        cartsDb[parseInt(cid) - 1] = cart
  
        await fs.promises.writeFile(this.path, JSON.stringify(cartsDb, null, '\t'), 'utf-8')
      } catch (error) {
        console.log(error);
      }
    }
}

