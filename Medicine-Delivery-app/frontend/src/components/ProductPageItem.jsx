import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height:30vh;
`;
const Wrapper = styled.div`
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  margin:10px 20px;
  width:180px;
`;

const Item = styled.div`
      height:80%;
      width:100%;
      ${'' /* background:white; */}
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      margin:10px;
      border:1px solid lightgrey;
      border-radius:10px;
`;
const Img = styled.img`
    height:80%;
    width:70%;
`;
const Itemname = styled.div`
   color:black; 
   text-decoration:none; 
   cursor:pointer; 
`;

const ProductPageItem = ({item}) => {
  return (
    <Container>
        <Link to={`/product/${item._id}`}>
        <Wrapper>
          <Item>
            <Img src={item.img}  />  
          </Item>
          <Itemname>{item.title}</Itemname>
        </Wrapper>
       </Link>
    </Container>
  )
}

export default ProductPageItem;
