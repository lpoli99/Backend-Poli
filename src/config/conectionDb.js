import { connect } from "mongoose"

const url = 'mongodb+srv://lpoli99:WQfT3VD9F3ZN0f85@cluster0.ysxae6l.mongodb.net/coderhouse?retryWrites=true&w=majority'

const dbConnection = async () =>{
    try {
        console.log('DB connected')
        return await connect(url)
        
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

export default dbConnection

