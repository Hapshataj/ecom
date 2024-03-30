import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import bodyParser from 'body-parser'; // Import body-parser middleware

//dotenv config
dotenv.config();

//database config
connectDB();

//app object
const app = express();

//middlewares
app.use(cors()); // Initialize cors middleware as a function
app.use(express.json());
app.use(bodyParser.json({ limit: '1000mb' })); // Increase payload size limit
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get('/', (req, res) => {
    res.send({ message: "welcome to my app" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON payload" });
    }
    next();
});

//PORT
const PORT = process.env.PORT || 6000;

//run listen 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
