import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height:100%;
`;
const Wrapper = styled.div`
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`;

const Item = styled.div`
      height:70%;
      background:white;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      margin:10px;
`;
const Img = styled.img`
    height:100%;
`;
const Itemname = styled.div`
   color:black; 
   text-decoration:none; 
   cursor:pointer; 
`;

const CategoryItem = ({item,itemType}) => {
const imgWidth = itemType === 'Offers' ? '250px' : '150px';
const imgborder = itemType === 'Offers' ? 'none' : '1px solid lightgrey';



  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Wrapper>
          <Item>
            <Img src={item.img} style={{ width: imgWidth, border: imgborder,"border-radius":'10px'}} />  
          </Item>
          <Itemname>{item.title}</Itemname>
        </Wrapper>
      </Link>
    </Container>
  )
}

export default CategoryItem
