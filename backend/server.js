import dotenv from 'dotenv';
dotenv.config();
import  express  from "express";
import userRoutes from './routes/userRoutes.js';
import parcelRoutes from './routes/parcelRoutes.js';
import parcelStatusRoutes from './routes/parcelStatusRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectMongoDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

connectMongoDB();

const port = process.env.PORT || 8000;

const app = express();

app.use(cors({origin: process.env.ORIGIN, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/parcel', parcelRoutes);
app.use('/api/parcelStatus',parcelStatusRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
}); 