
import React from 'react'
import styled from 'styled-components';

const Container = styled.div``;
const Wrapper = styled.div`
    margin:10px 0px;
    height:10vh;
    display:flex;
    align-items:center;
`;
const Heading = styled.div`
    font-size:35px;
    font-weight:500;   
    margin-left:30px; 
    flex:20%;
`;
const Line = styled.div`
    margin:10px 0px;
    flex:70%;
    height:30px;
    background:#03b0be;
`;

const CategoryHead = (props) => {
  return (
    <Container>
        <Wrapper>
            <Heading>{props.Headingtext}</Heading>
            <Line/>
        </Wrapper>
    </Container>
  )
}

export default CategoryHead;
