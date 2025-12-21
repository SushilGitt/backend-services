import mongoose from "mongoose"

const connectDB = async () => {
    if(!process.env.MONGODB_URI) {
        throw new Error("MongoDB url not defined!")
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI)
    
    if(conn) {
        console.log(`MongoDB connected: ${conn.connection.host}: ${conn.connection.name}`)
    }
    else {
        console.log("MongoDB connection failed!")
        process.exit(1)
    }
    
}

export default connectDB