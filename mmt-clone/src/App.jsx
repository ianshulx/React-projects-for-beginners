import React from 'react'
import './App.css'
const App = () => {
  return (
    <>
      <header>
        <div className="left">
          <img src="https://content3.jdmagicbox.com/comp/delhi/d5/011pxx11.xx11.180330132949.f7d5/catalogue/makemytrip-india-pvt-ltd-head-office-gurgaon-sector-25-gurgaon-corporate-companies-69leb1zrx4.jpg" alt="" />
        </div>
        <div className="right">
          <nav className="navbar">
            <ul type="none">
              <li>Home</li>
              <li>About</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </nav>

        </div>
      </header>
      <div className="next">
        <div className="text">
          <h2>Find your Next tour!</h2>
          <h4>Where would you like to go?</h4>
          <div className="back">
            <input type="text" placeholder="Where would you like to go?" />
            <input type="date" placeholder="When would you like to go?" />
            <button>Submit Now</button>
          </div>
        </div>
      </div>

    </>
  )
}
export default App
