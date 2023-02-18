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
  // async addProduct (title, description, price, thumbnail, code, stock, status, category) {
  //   const product = {
  //     title,
  //     description,
  //     price,
  //     thumbnail,
  //     code,
  //     stock,
  //     status,
  //     category,
  //   }

  //   try {
  //     if (fs.existsSync(this.path)) {
        
  //       console.log("Exists!")
  //       let data = await fs.promises.readFile(this.path, "utf-8")
  //       let dataJS = JSON.parse(data)
  //       product.id = dataJS[dataJS.length - 1].id + 1;
  //       dataJS.push(product)
  //       await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, "utf-8")
  //     } else {
  //       product.id = 1
  //       const arrProducts = [product]
  //       await fs.promises.writeFile(this.path, `${JSON.stringify(arrProducts, null, 2)}`, "utf-8")
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
  // updateProduct = async (id, prod) => {
  //   let dB = fs.readFileSync(this.path, "utf-8")
  //   let products = JSON.parse(dB)

  //   let productById = await products.find((product) => product.id === id)

  //   productById = prod
  //   productById.id = id

  //   products.splice(id - 1, 1, productById)

  //   fs.writeFileSync( this.path, `${JSON.stringify(products, null, 2)}`, "utf-8")
  //   return products
  // }

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
  // deleteProduct = async (id) => {
  //   let dB = fs.readFileSync(this.path, "utf-8")
  //   let products = await JSON.parse(dB)

  //   products.splice(id - 1, 1)

  //   let counter = 1

  //   products.forEach((product) => {
  //     product.id = counter++
  //   })

  //   fs.writeFileSync( this.path, `${JSON.stringify(products, null, 2)}`, "utf-8")
  //   return `Product deleted`
  // }
}

// export default ProductManager
