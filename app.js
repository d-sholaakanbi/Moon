require ("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose");











const start = async () => {
    try {
        await mongoose.connect (process.env.MONGO_URI);
        app.listen (PORT, () => {
            console.log (`server running on port ${PORT}`);
        });
    } catch (error) {
        console.log (error)
    }
}

start();