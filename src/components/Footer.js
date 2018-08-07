import React from 'react';
import {NavLink} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


export const Footer = () => (
    <footer>
        <div className="footer__container">
            <div className="footer__company">
                <p>Contact us</p>
            </div>
            <ul className="footer__nav">
                <li><NavLink className="footer__social-link" to="#"><FontAwesome name="facebook"/> Facebook</NavLink></li>
                <li><NavLink className="footer__social-link" to="#"><FontAwesome name="twitter"/> Twitter</NavLink></li>
                <li><NavLink className="footer__social-link" to="#"><FontAwesome name="linkedin"/> LinkedIn</NavLink></li>
                <li><NavLink className="footer__social-link" to="#"><FontAwesome name="instagram"/> Instagram</NavLink></li>
                <li><NavLink className="footer__social-link" to="#"><FontAwesome name="google-plus"/> Google+</NavLink></li>
            </ul>
        </div>
        <div className="footer__company">
            <p>Find Event 2018 &copy;</p>
        </div>
    </footer>
);

export default Footer;