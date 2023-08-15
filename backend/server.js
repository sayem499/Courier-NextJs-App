import dotenv from 'dotenv';
dotenv.config();
import  express  from "express";
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectMongoDB } from './config/db.js';

connectMongoDB();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
}); 