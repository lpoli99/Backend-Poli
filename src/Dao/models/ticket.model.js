import { Schema, model } from "mongoose"

const ticketCollection = "tickets"

const ticketSchema = new Schema({
    code: {
        type: String,
        default: 5
    },
    purchase_datetime: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})
export default model(ticketCollection, ticketSchema)