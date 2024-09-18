import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

    const {url, setToken} = useContext(StoreContext);

    const [currentState, setCurrentState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {

        // To prevent the page from reloading
        event.preventDefault();

        let newUrl = url;
        if(currentState === "Login"){
            newUrl += "/api/user/login";
        }
        // if current state is not "login" 
        else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(`${newUrl}`, data);


        if(response.data.success){
            // save the token in state variable 
            setToken(response.data.data.token);
            // since the response is => data : {token:token}
            console.log(response.data.data.token);
            localStorage.setItem("token", response.data.data.token);
            setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    }

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-inputs">
                    {currentState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required />
                </div>

                <button type="submit">{currentState === "Sign Up" ? "Create account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing,I accept all terms & conditions and the terms of use & privacy policy</p>
                </div>

                {currentState === "Login"
                    ? <p>Create a new account?  <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span></p>
                    : <p>Already have an accunt?  <span onClick={() => setCurrentState("Login")}>Login</span></p>
                }

            </form>
        </div>
    )
}
export default LoginPopup