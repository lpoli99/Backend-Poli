import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = 'products'
const ProductSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true,
        unique: true
    }
})

ProductSchema.plugin(mongoosePaginate)

export default model(productCollection, ProductSchema)