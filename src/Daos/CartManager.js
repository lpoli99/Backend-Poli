import fs from 'fs'

export class CartManager {
  #route = '../DB/Carts.json'
    constructor() {
        this.path = this.#route
        this.cart = [];
    }

    getProducts = async () => {
        try {
          if (fs.existsSync(this.path)) {
            let dB = fs.readFileSync(this.path, "utf-8");
            let products = JSON.parse(dB);
      
            console.log(products);
            return products;
          }
          return [];
        } catch (error) {
          return 'There are no products in cart'
        } 
    }

    getProductById = async (id) => {
        let dB = fs.readFileSync(this.path, "utf-8");
        let products = JSON.parse(dB);
        console.log(products);
    
        const productById = await products.find((product) => product.id === id);
    
        if (!productById) {
          return `Product with selected id not found in cart!`;
        }
        return productById;
    }

    addProduct = async (newProduct) => {
        let productsDb = await this.getProducts();
    
        const data = await productsDb.find(
          (product) => product.code === newProduct.code
        );
    
        try {
          if (data) {
            return `Se encuentra el producto`;
          }
    
          if (productsDb.length === 0) {
            newProduct.id = 1;
            productsDb.push(newProduct);
          } else {
            productsDb = [
              ...productsDb,
              { ...newProduct, id: productsDb[productsDb.length - 1].id + 1 },
            ];
          }
          fs.promises.writeFile(this.path, JSON.stringify(productsDb, null));
          return 'Product added'
        } catch (err) {
          console.log(err);
        }
    }
}
// const cart = new CartManager("../DB/Carts.json")
// cart.addProduct({
//       title: "producto 1",
//       description: "producto test 1",
//       price: 20,
//       thumbnail: "sin imagen",
//       code: 1,
//       stock: 25,
// })
// console.log(cart.getProducts());
// console.log(cart.getProductById(1));
