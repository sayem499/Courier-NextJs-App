import { createPool } from 'mysql2';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectMongoDB = async () => {
//{dbName:'CourierNextJSApp', useNewUrlParser: true}
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    }catch (error){
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }

}

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
})


export { pool, connectMongoDB};