import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placeing user order for frontend
const placeOrder = async (req, res) => {
    
    // const frontend_url = "http://localhost:5173";
    const frontend_url = "http://localhost:5000";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        // save the order in DB
        await newOrder.save();
        // clearing the cart
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});


        // create stripe payment link
        const line_items = req.body.items.map((item) =>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 88, // price in cents, to convert to INR
            },
            quantity: item.quantity,
        }) );

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges",
                },
                unit_amount: 2 * 100 *88, // price in cents, to convert to INR
            },
            quantity: 1,

        });

        console.log("Control reached before stripe checkout session");

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // res.status(201).json({success: true, message : "Order Placed Successfully"});

        res.status(200).json({ success : true, session_url: session.url});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.status(200).json({success: true, message: "Payment Successful"});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({success: false, message: "Payment Failed"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

// user orders for frontend
const userOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({} );
        res.status(200).json({success: true, data: orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

// API for updating order status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.body.orderId, {status: req.body.status});
        res.status(200).json({success: true, message: "Order status updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus };