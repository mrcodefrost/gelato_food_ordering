import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

import 'dotenv/config';


// import bodyParser from "body-parser";
// import userRoutes from "./routes/userRoutes.js"
// import orderRoutes from "./routes/orderRoutes.js


// app config 
const app = express();

const port = process.env.PORT || 4000;


// middleware
app.use(express.json()); // whenever request comes from frontend, it will be parsed as json
app.use(cors()); // access backend from frontend


// DB connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
// To serve images
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("Server is ready");
});


// to run server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});