import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDb connected at ${conn.connection.host}`);

    }
    catch (error) {
        console.log(`Error in Mongodb connection`, error)

    }
}

export default connectDB;