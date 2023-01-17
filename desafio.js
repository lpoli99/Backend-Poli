class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => this.products;

  getProductsById = (id) => {
    const productsDb = this.products.find((product) => product.id === id);
    if (!productsDb) {
      return `Not found`;
    }
    return productsDb;
  };

  addProduct = (newProduct) => {
    const productsDb = this.products.find(
      (product) => product.code === newProduct.code
    );

    if (productsDb) {
      return `Se encuentra el producto`;
    }

    if (this.products.length === 0) {
      newProduct.id = 1;
      this.products.push(newProduct);
    } else {
      this.products = [
        ...this.products,
        { ...newProduct, id: this.products[this.products.length - 1].id + 1 },
      ];
    }
  };
}
const products = new ProductManager();

console.log(
  products.addProduct({
    title: "producto 1",
    description: "producto test 1",
    price: 20,
    thumbnail: "sin imagen",
    code: 1,
    stock: 25,
  })
);

console.log(
  products.addProduct({
    title: "producto 2",
    description: "producto test 2",
    price: 30,
    thumbnail: "sin imagen",
    code: 2,
    stock: 30,
  })
);

console.log(products.getProducts());
console.log(products.getProductsById(3));
