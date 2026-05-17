import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import '../../App.css'
const Home = () => {
    return (
        <div className='home-container'>
            <LeftSidebar/>
            <HomeMainbar/>
            <RightSidebar/>
        </div>
    )
}

export default Home