import { createContext, useEffect, useState } from "react";
import { foodList } from "../assets/assets";
import axios from 'axios';


export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});

    // set backend url
    const url = "http://localhost:4000";

    // to save token
    const [token, setToken] = useState("");

    const [foodList, setFoodList] = useState([]);

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
        for (const item in cartItems) {
            let itemInfo = foodList.find((product) => product._id === item);
            // price of one product * quantity of product
            totalAmount += itemInfo.price * cartItems[item];
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }

    // To avoid logging out when page is reloaded
    useEffect(() => {


        // fetching food list
        async function loadData() {
            fetchFoodList();

            // updating token state with local storage
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }

        loadData();
    }, []);

    // any element added to this object is accessible in any component
    // using the context
    const contextValue = {

        // variables
        foodList,
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