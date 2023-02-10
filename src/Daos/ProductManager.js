import fs from "fs"

class ProductManager {
  #route = '../DB/products.json'
  constructor() {
    this.path = this.#route
    this.products = []
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        let dB = fs.readFileSync(this.path, "utf-8");
        let products = JSON.parse(dB)

        console.log(products)
        return products
      }
      return []
    } catch (error) {
      return "There are no products";
    }
  }

  async addProduct (title, description, price, thumbnail, code, stock, status, category) {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    }

    try {
      if (fs.existsSync(this.path)) {
        
        console.log("Exists!")
        let data = await fs.promises.readFile(this.path, "utf-8")
        let dataJS = JSON.parse(data)
        product.id = dataJS[dataJS.length - 1].id + 1;
        dataJS.push(product)
        await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, "utf-8")
      } else {
        product.id = 1
        const arrProducts = [product]
        await fs.promises.writeFile(this.path, `${JSON.stringify(arrProducts, null, 2)}`, "utf-8")
      }
    } catch (error) {
      console.log(error)
    }
  }

  getProductById = async (id) => {
    let dB = fs.readFileSync(this.path, "utf-8")
    let products = JSON.parse(dB)

    const productById = await products.find((product) => product.id === id)

    if (!productById) {
      return `Product with selected id not found!`
    }
    return productById
  }

  updateProduct = async (id, prod) => {
    let dB = fs.readFileSync(this.path, "utf-8")
    let products = JSON.parse(dB)

    let productById = await products.find((product) => product.id === id)

    productById = prod
    productById.id = id

    products.splice(id - 1, 1, productById)

    fs.writeFileSync( this.path, `${JSON.stringify(products, null, 2)}`, "utf-8")
    return products
  }

  deleteProduct = async (id) => {
    let dB = fs.readFileSync(this.path, "utf-8")
    let products = await JSON.parse(dB)

    products.splice(id - 1, 1)

    let counter = 1

    products.forEach((product) => {
      product.id = counter++
    })

    fs.writeFileSync( this.path, `${JSON.stringify(products, null, 2)}`, "utf-8")
    return `Product deleted`
  }
}


export default ProductManager
