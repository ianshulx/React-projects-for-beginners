import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'
import playstore from '../images/play-store.avif'
import applestore from '../images/app-store.avif'

const Footer = () => {
  return (
    <>
    <div className="footer-top">
        <div className='footer-start'><h1>HOMEGROWN INDIAN BRAND</h1></div>
        <h1>Over <span>6 Million</span> Happy Customers</h1>
      </div>
    <footer className="footer">

      <div className="footer-links">
        <div className="footer-column">
          <h3>NEED HELP</h3>
          <ul>
            <li><a href="https://www.linkedin.com/in/manshusainishab/">Contact Us</a></li>
            <li><Link to='/UnderConstruction'>Track Order</Link></li>
            <li><Link to='/UnderConstruction'>Returns & Refunds</Link></li>
            <li><a href="https://www.linkedin.com/in/manshusainishab/">My Account</a></li>
          </ul>
          <p><i data-v-3610fc48="" className=" circleicon_light fa fa-rupee"></i>COD Available</p>
          <p><i data-v-3610fc48="" className="circleicon_light fa fa-refresh"></i>30 Days Easy Returns</p>
        </div>

        <div className="footer-column">
          <h3>COMPANY</h3>
          <ul>
            <li><a href="https://manshusainishab.github.io/portfolio/">About Us</a></li>
            <li><a href="https://tsspeopleportal.darwinbox.in/ms/candidate/careers">Careers</a></li>
            <li><a href="https://www.thesouledstore.com/from-the-soul">Community Initiatives</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>MORE INFO</h3>
          <ul>
            <li><Link to='/T&C'>T&C</Link></li>
            <li><Link to='/Privacypolicy'>Privacy Policy</Link></li>
            <li><a href="https://www.thesouledstore.com/blog/">Blogs</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>STORE NEAR ME</h3>
          <ul>
            <li><a href="https://maps.app.goo.gl/tg8MVsG3X9qYSkWE8">Mumbai</a></li>
            <li><a href="https://maps.app.goo.gl/MBieujFjej5y5wmY7">Pune</a></li>
            <li><a href="https://maps.app.goo.gl/5dL8z82R5nkn1aVJ7">Bangalore</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className='footer-bottom-head'><i className="fa fa-mobile-phone"></i>   EXPERIENCE THE SOULED STORE APP</div>
        <div className="app-links">
          <a href="https://play.google.com/store/apps/details?id=com.thesouledstore" target='_blank'><img src={playstore} alt="Get it on Google Play" /></a>
          <a href="https://apps.apple.com/in/app/the-souled-store/id1493897434" target='_blank'><img src={applestore} alt="Download on the App Store" /></a>
        </div>
        <div className="social-links">
          Follow Us:
          <a href="https://www.facebook.com/souledstore/" target='_blank' ><i className="fa fa-facebook"></i></a>
          <a href="https://www.instagram.com/TheSouledStore/" target='_blank'><i className="fa fa-instagram"></i></a>
          <a href="https://www.snapchat.com/add/thesouledstore" target='_blank' ><i className="fa fa-snapchat"></i></a>
          {/* <a href="/"><i className="fa fa-x"></i></a> Twitter (X) */}
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
