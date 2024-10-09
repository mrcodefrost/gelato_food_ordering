import './PlaceOrder.css';
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios';


const PlaceOrder = () => {


  const {getTotalCartAmount, url, foodList, cartItems, token} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}));
  }

  const placeOrder = async (event) => {


    // dont reload the page
    event.preventDefault();

    let orderItems = [];
    foodList.map((item) => {

      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }

    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    let reponse = await axios.post(url + "/api/order/place", orderData, {headers:{token}});

    if(reponse.data.success == true){
      const {session_url} = reponse.data;
      window.location.replace(session_url);
    }

    else {
      alert(reponse.data.message);
    }
    console.log(orderItems);

  }


  return (
    <form onSubmit={placeOrder} action="" className="place-order">

    <div className="place-order-left">
      <p className="title">Delivery information</p>
      <div className="multi-fields">
        <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} id="" placeholder='First Name'/>
        <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} id="" placeholder='Last Name'/>
      </div>
      <input required type="email" name="email" onChange={onChangeHandler} value={data.email} id="" placeholder='Email Address'/>
      <input required type="text" name="street" onChange={onChangeHandler} value={data.street} id="" placeholder='Street'/>
      <div className="multi-fields">
      <input required type="text" name="city" onChange={onChangeHandler} value={data.city} id="" placeholder='City'/>
      <input required type="text" name="state" onChange={onChangeHandler} value={data.state} id="" placeholder='State'/>
      </div>
      <div className="multi-fields">
      <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} id="" placeholder='Zip Code'/>
      <input required type="text" name="country" onChange={onChangeHandler} value={data.country} id="" placeholder='Country'/>
      </div>
      <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone'/>
    </div>

    <div className="place-order-right">
    <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ?  0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed to payment</button>
        </div>
    </div>
    </form>
  )
}
export default PlaceOrder