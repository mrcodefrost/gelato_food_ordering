import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, userOrders, verifyOrder, updateOrderStatus } from "../controllers/orderController.js";


const orderRouter = express.Router();

// auth middleware to convert token into userId
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateOrderStatus)

export default orderRouter;
