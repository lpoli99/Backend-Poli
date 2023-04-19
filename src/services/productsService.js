import { ProductManagerMongo } from "../Dao/ProductManagerMongo.js"

const productManagerMongo = new ProductManagerMongo

class ProductsService {
    async getProducts(limit){
        return await productManagerMongo.getProducts(limit)
    }

    async getProductById(pid){
        return await productManagerMongo.getProductById(pid)
    }

    async addProduct(title, description, price, thumbnail, code, stock, status, category){
        return await productManagerMongo.addProduct(title, description, price, thumbnail, code, stock, status, category)
    }

    async updateProduct(pid, obj){
        return await productManagerMongo.updateProduct(pid, obj)
    }

    async deleteProduct(pid){
        return await productManagerMongo.deleteProduct(pid)
    }
}

export default ProductsService