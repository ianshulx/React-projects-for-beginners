import React from "react";
import styled from "styled-components";
import mapicon from "../images/Mapicon.png";
import { Link } from "react-router-dom";
const Container = styled.div`
  margin: 20px 0px;
  height: 40vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9ff;
  a {
    color: black;
    text-decoration: none;
    margin: 0;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  padding-top: 50px;
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ShopLogo = styled.img`
  margin-right: 10px;
`;
const NearbyText = styled.div``;
const Heading = styled.h2``;
const Subline = styled.div`
  color: green;
  font-weight: 500;
`;

const Right = styled.div`
  flex: 50%;
  height: 100%;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
  margin-right: 400px;
`;
const Img2 = styled.img`
  height: 120%;
  width: 80%;
  padding-left: 100px;
`;
const NearbyStores = () => {
  return (
    <Container>
      <Wrapper>
        <Link to="/nearbypharmacies">
          <Left>
            <ShopLogo src="https://www.netmeds.com/assets/icons/store.png" />
            <NearbyText>
              <Heading>Locate Pharmacy Shops</Heading>
              <Subline>Pharmacy Shop Near you </Subline>
            </NearbyText>
          </Left>
        </Link>
        <Right>
          <Img2 src={mapicon} />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NearbyStores;
