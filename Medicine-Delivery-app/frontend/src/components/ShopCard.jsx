import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const CardContainer = styled.div`
  height: auto;
  width: 20rem;
  background-color: white;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  margin: 0rem 1rem 2.5rem 1rem;
  padding-bottom: 0.7rem;
  border-radius: 1.5rem;
`;
const Image = styled.img`
  height: 20rem;
  width: 100%;
  padding: 0 0 1rem 0;
`;
const Content = styled.div`
  padding-left: 0.7rem;
`;
const Description = styled.p`
  color: #979b9e;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Address = styled.p`
  font-size: 0.9rem;
  color: #151b3999;
  margin-bottom: 10px;
`;
const Rating = styled.p`
  font-size: 1.5rem;
  color: #979b9e;
  font-weight: 700;
`;
const TextContent = styled.div`
  height: 7.5rem;
`;
const ShopCard = (props) => {
  return (
    <Container>
      <CardContainer>
        <Image src={props.link} />

        <Content>
          <TextContent>
            <h1
              style={{
                color: "#464748",
                fontSize: "1.5rem",
                paddingBottom: "1rem",
              }}
            >
              {props.name}
            </h1>
            <Description>{props.desc}</Description>
            <Address>{props.addr}</Address>
          </TextContent>
          <Rating>{props.rating}</Rating>
        </Content>
      </CardContainer>
    </Container>
  );
};
export default ShopCard;
