import React from "react";
import styled from "styled-components";
import img from "../images/looogo.png";
const Container = styled.div`
  background-color: ${(props) => props.bg};
  box-sizing: border-box;
  width: 320px;
  height: auto;
  display: inline-block;
  padding: 2rem 1.5rem 0.3rem 1.5rem;
  border-radius: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 2rem;
`;
const Info = styled.p`
  font-size: 0.865rem;
  color: #151b3999;
`;
const Button = styled.button`
  padding: 1rem 2rem 1rem 2rem;
  background-color: white;
  color: black;
  /* box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1); */
  font-size: 1rem;
  font-weight: 600;

  border: none;
  border-radius: 1rem;
  margin-top: auto;
  margin-bottom: 2rem;
  display: inline-block;
`;
const Price = styled.p`
  display: block;
  margin-top: -0.7rem;
  font-size: 3rem;
  margin-top: 0.5rem;
  p {
    color: #00000099;
    text-decoration: line-through;
    font-size: 1rem;
    display: inline;
  }
  span {
    display: inline-block;
    color: #ef4281;
    font-size: 1.7rem;
    font-weight: 600;
  }
`;
const ButImage = styled.div`
  display: flex;
`;
const Image = styled.img`
  display: inline-block;
  height: auto;
  width: 50%;
  margin-left: 1rem;
`;
const MainContent = styled.div`
  height: 12rem;
`;
const LabTestCards = (props) => {
  return (
    <Container bg={props.color}>
      <MainContent>
        <h1
          style={{
            color: "#252525",
            fontSize: "1.4rem",
            paddingBottom: "1rem",
            fontWeight: "500",
          }}
        >
          {props.Name}
        </h1>
        <Info>{props.content}</Info>
        <Price>
          <p>{props.price}</p>
          <span> {props.discount}</span>
        </Price>
      </MainContent>
      <ButImage>
        <Button>Book Now</Button>
        <Image src={img}></Image>
      </ButImage>
    </Container>
  );
};
export default LabTestCards;
