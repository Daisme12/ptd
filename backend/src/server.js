import express from 'express';
import dotenv from 'dotenv';
import app from "./app.js";
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


