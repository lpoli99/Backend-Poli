const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  getProducts() {
    if (fs.existsSync(this.path)) {
      let dB = fs.readFileSync(this.path, "utf-8");
      let products = JSON.parse(dB);

      console.log(products);
      return products;
    }
    return [];
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
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = (id) => {
    let dB = fs.readFileSync(this.path, "utf-8");
    let products = JSON.parse(dB);

    const productById = products.find((product) => product.id == id);

    if (!productById) {
      return `Product with selected id not found!`;
    }
    return productById;
  };

  updateProduct(id, prod) {
    let dB = fs.readFileSync(this.path, "utf-8");
    let products = JSON.parse(dB);

    let productById = products.find((product) => product.id == id);

    productById = prod;
    productById.id = id;

    products.splice(id - 1, 1, productById);

    console.log(products);

    fs.writeFileSync(
      this.path,
      `${JSON.stringify(products, null, 2)}`,
      "utf-8"
    );
  }

  deleteProduct(id) {
    let dB = fs.readFileSync(this.path, "utf-8");
    let products = JSON.parse(dB);

    products.splice(id - 1, 1);

    let counter = 1;

    products.forEach((product) => {
      product.id = counter++;
    });

    fs.writeFileSync(
      this.path,
      `${JSON.stringify(products, null, 2)}`,
      "utf-8"
    );
    return `Product deleted`;
  }
}
const products = new ProductManager("./products.json");

// products.addProduct({
//   title: "producto 1",
//   description: "producto test 1",
//   price: 20,
//   thumbnail: "sin imagen",
//   code: 1,
//   stock: 25,
// })

// products.addProduct({
//   title: "producto 2",
//   description: "producto test 2",
//   price: 30,
//   thumbnail: "sin imagen",
//   code: 2,
//   stock: 30,
// })

// const update = {
//   title: "producto update",
//   description: "producto update 1",
//   price: 50,
//   thumbnail: "sin imagen",
//   code: 4,
//   stock: 31,
// }

// const update2 = {
//   title: "producto update",
//   description: "producto update 2",
//   price: 70,
//   thumbnail: "sin imagen",
//   code: 098,
//   stock: 38,
// }

// console.log(products.getProducts());
// console.log(products.getProductById(1));
// console.log(products.updateProduct(1, update));
// console.log(products.updateProduct(2, update2));
// console.log(products.deleteProduct(1));