import React from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
// import { useState,useEffect } from 'react';

import { useLocation } from 'react-router-dom';
// import axios from 'axios';


const Container = styled.div`
    width:85%; 
    margin: 0 auto;
    
`;




const Products = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  console.log(category);
  return (
    <>
    <Navbar/>
    <Container>
        <Product cat={category}/>
    </Container>
    <Footer/>
    </>
  )
}

export default Products
