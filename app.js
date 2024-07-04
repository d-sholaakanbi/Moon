const mongoose = require('mongoose');
const express = require('express');
const app = express();
const errorHandler = require('./PRODUCTS/middleware/errorHandler');
const notFound = require('./PRODUCTS/middleware/notFoundRoutes');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

// DB connection
// DB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.error("UNABLE to connect to DB", err); 
});


// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(cookieParser());
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));


// Import routes
const categoryRouter = require("./PRODUCTS/routes/categoriesRouter");
const productsRouter = require("./PRODUCTS/routes/productRouter");

// Use routes
app.use('/api/categories', categoryRouter);
app.use('/api/products', productsRouter);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFound);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
