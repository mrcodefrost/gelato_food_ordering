import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";


export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});

    // set backend url
    const url = "http://localhost:4000";

    // to save token
    const [token, setToken] = useState("");

    const addToCart = (itemId) => {

        console.log('Item ID', itemId);
        // if item is not already in cart
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) {
            let itemInfo = food_list.find((product) => product._id === item);
            // price of one product * quantity of product
            totalAmount += itemInfo.price * cartItems[item];
        }
        return totalAmount;
    }

    // To avoid logging out when page is reloaded
    useEffect(() => {
        // updating token state with local storage
        if(localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    // any element added to this object is accessible in any component
    // using the context
    const contextValue = {

        // variables
        food_list,
        cartItems,
        url,
        token,
        
        // functions
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        setToken,

    };
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    );

}

export default StoreContextProvider;