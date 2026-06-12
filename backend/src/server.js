import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import app from "./app.js";
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5001; 

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log('Server is running on port 5001');
    });
});


