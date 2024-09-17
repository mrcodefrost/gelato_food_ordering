import './Footer.css';
import {assets} from '../../assets/assets.js';

const Footer = () => {
  return (
    <div className="footer" id='footer'>
        
    <div className="footer-content">
        
    <div className="footer-content-left">
        <img src={assets.logo} alt="" />
        <p>Copyright © 2022. All rights reserved. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore laborum in repudiandae alias atque expedita consectetur quidem illo officia! Architecto corrupti illum pariatur quod accusantium labore quos, explicabo temporibus in?</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
    </div>

    <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
    </div>

    <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+1-212-456-7890</li>
            <li>mr.codefrost@gmail.com</li>
        </ul>
    </div>

    </div>    
    <hr />
    <p className="footer-copyright">
        Copyright © 2022. All rights reserved.
    </p>
        
    </div>
  )
}
export default Footer