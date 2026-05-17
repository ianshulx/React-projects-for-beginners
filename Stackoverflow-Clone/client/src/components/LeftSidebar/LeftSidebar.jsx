import React from 'react'
import {NavLink} from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
import './LeftSidebar.css'


const LeftSidebar = () => {
    return (
        <div className='left-sidebar'>
            <nav className='side-nav'>
                <NavLink to='/' className='side-nav-links' activeclassname='active' >
                    <p>Home</p>

                </NavLink>
                <div className='side-nav-div'>
                    <div><p className="side-nav-links">Public</p></div>
                    <NavLink to='/Questions' className="side-nav-links2">
                        <img src={Globe} alt="Globe" className="globe-img" style={{paddingLeft:"10px"}}/>
                        <p className="Questions-p">Question</p>
                    </NavLink>
                    <NavLink to="/Tags" className="side-nav-links"  style={{paddingLeft:"40px"}}>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to="/Users" className="side-nav-links"  style={{paddingLeft:"40px"}}>
                        <p>Users</p>
                    </NavLink>
                </div>
            </nav>

        </div>
    )
}

export default LeftSidebar