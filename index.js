import express from 'express';
const app = express();
const PORT = 3000;
//
import path from 'path';
import productRouter from './routes/productRoutes.js';


// mongodb connection
import dotenv from 'dotenv';
import connectDB from './config/db.js';
connectDB();


app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.use('/api/v1/products', productRouter);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.METHODS(PATH, Handler)


app.get('/', (req, res) => {
    res.send(" Hello World!");
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging

    // Respond with a status code and error message
    res.status(500).json({
        status: false,
        message: err.message || "Something went wrong!"
    });
});


app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});