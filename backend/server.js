import express from "express";
import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import userRoutes from "./routes/userRoutes.js"
// import orderRoutes from "./routes/orderRoutes.js


// app config 
const app = express();

const port = process.env.PORT || 4000;


// middleware
app.use(express.json()); // whenever request comes from frontend, it will be parsed as json
app.use(cors()); // access backend from frontend

app.get("/", (req, res) => {
    res.send("Server is ready");
});


// to run server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});