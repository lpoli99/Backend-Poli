import fs from "fs"

export class ProductManager {
  #route = '../products.json'
  constructor() {
    this.path = this.#route
    this.products = []
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        let dB = await fs.promises.readFile(this.path, "utf-8")
        let products = JSON.parse(dB)
        return products
      }
      await fs.promises.writeFile(this.path, '[]', 'utf-8')
      return []
    } catch (error) {
      console.log(error)
    }
  }


  addProduct = async (newItem) => {
    let productDb = await this.getProducts()
    try {
      if (productDb.length === 0) {
        newItem.id = 1
        productDb.push(newItem)
      } else {
        productDb = [ ...productDb, { ...newItem, id:productDb[productDb.length -1].id + 1}]
      }
      await fs.promises.writeFile(this.path, JSON.stringify(productDb, null,'\t'))
      console.log('Product added!');
    } catch (error) {
      console.log(error);
    }
  }

  getProductById = async (id) => {
    let dB = await fs.promises.readFile(this.path, "utf-8")
    let products = JSON.parse(dB).slice(id - 1, id)

    if (!products) {
      return `Product with selected id not found!`
    }
    return products
  }


  updateProduct = async (id, prod) => {
    let dB = await fs.promises.readFile(this.path, 'utf-8')
    let products = await JSON.parse(dB)
    let productById = await products.findIndex(product => product.id.toString() === id)
    if (productById === -1) {
      return console.log(`Product with id: ${id} does not exist!`)
    }
    products[index] = { ...prod, id: products[index].id }
    await fs.promises.writeFile(this.path, JSON.stringify(products, null,'\t'))
    console.log('Product updated!');
  }

  deleteProduct = async (id) => {
    let dB = await fs.promises.readFile(this.path, 'utf-8')
    let products = await JSON.parse(dB)
    let prodToDelete = await products.findIndex(product => product.id.toString() === id)
    if (prodToDelete === -1) {
      return console.log(`Product with id: ${id} does not exist!`)
    }
    products.splice(index, 1)
    await fs.promises.writeFile(this.path, JSON.stringify(products, null,'\t'))
    console.log('Producto deleted!');
  }
}

