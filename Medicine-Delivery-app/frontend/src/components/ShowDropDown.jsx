import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ccc;

  img {
    width: 30px;
    height: 50px;
    margin: 10px 30px;
  }
  p{
    color: grey;
    opacity:70%;
  }

  button{
    margin-left: 100px;
    height:30px;
    width:150px;
    font-weight:500;
    font-size:20px;
    color:white;
    border:none;
    border-radius:5px;
    background:red;
  }
`;


const ShowDropDown = ({ results }) => {
    console.log(results);
    return (
      <Dropdown>
        {results.map((product) => (
        
          <DropdownItem key={product._id}>
            <img src={product.img} alt={product.name} />
            <div>
            <h3>{product.title}</h3>
            <p>{product.desc}</p>
            </div> 
            <Link to={`/product/${product._id}`}>
            <button>Buy Now</button>
            </Link>
          </DropdownItem>
        ))}
      </Dropdown>
    );
  };

export default ShowDropDown;
