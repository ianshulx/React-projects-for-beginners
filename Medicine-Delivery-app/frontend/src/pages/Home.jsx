import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import NearbyStores from '../components/NearbyStores';
import Slider from '../components/Slider';




const Home = () => {
  return (
    <div>
      <Navbar/>
        <Slider/>
        <Categories Heading="Shop By Categories" CategoryType="CategoryData"/>
        <Categories Heading="Trending Brands" CategoryType="FeatureBrand"/>
        <Categories Heading="Offers" CategoryType="Offers" background='#FFF8E3'/>
        <NearbyStores/>
      <Footer/>
    </div>
  )
}

export default Home;
