import { useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopup.css';


const LoginPopup = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState("Sign Up");


    return (
        <div className="login-popup">
            <form action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-inputs">
                    {currentState === "Login" ? <></> : <input type="text" placeholder='Your Name' required />}
                    <input type="email" placeholder='Your Email' required />
                    <input type="password" placeholder='Your Password' required />
                </div>

                <button>{currentState === "Sign Up" ? "Create account" : "Login"}</button>

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