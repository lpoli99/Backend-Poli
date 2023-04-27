import { Schema, model } from "mongoose"

const userCollection = 'users'

const userSchema = Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: 'carts',
        require: true
    },
    password:{
        type: String,
        required: true
    }
})

userSchema.pre('find', function(){
    this.populate('cart')
})

export default model(userCollection, userSchema)