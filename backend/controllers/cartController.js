import userModel from "../models/userModel.js";


// Add to cart

const addToCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // if item is not already in cart
        if (!cartData[req.body.itemId]) {
            // setting the item count to 1 if item is not in cart
            cartData[req.body.itemId] = 1;
        }
        else {
            // if item is already in cart, increment the item count
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.status(200).json({ success: true, message: "Item added to cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

// Remove from cart

const removeFromCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // if item is not already in cart then return error
        if (!cartData[req.body.itemId]) {
            return res.status(400).json({ success: false, message: "Item does not exist in cart" });
        }

        // if item is already in cart, decrement the item count
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ success: true, message: "Item removed from cart" });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

// Get user cart items

const getCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.status(200).json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export { addToCart, removeFromCart, getCart };