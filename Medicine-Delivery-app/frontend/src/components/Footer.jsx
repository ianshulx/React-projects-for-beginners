import React from "react";
import styled from "styled-components";
import FooterLogo from "../images/Footerlogo.png";
import {
  Copyright,
  Facebook,
  Instagram,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
const Container = styled.div`
  background: #eef4ff;
  padding: 20px;
  height: 60vh;
  a {
    text-decoration: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  margin: 20px;
`;
const Div = styled.div`
  flex: 1;
`;
const Heading = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin: 15px 0px;
`;
const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: grey;
`;
const Logo = styled.img`
  height: 80px;
  width: 250px;
`;
const Social = styled.div`
  display: flex;
  flex-direction: column;
`;
const Follow = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
`;
const SocialMedia = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const Icons = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const Copywrite = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Div>
          <Heading>Company</Heading>
          <Text>About Us</Text>
          <Text>Careers</Text>
          <Link to="/blogs">
            <Text>Blog</Text>
          </Link>
          <Text>Partners With MediSwift</Text>

          <Heading>Our Services</Heading>
          <Text>Order Medicines</Text>
          <Link to="/labtests">
            <Text>Lab Tests</Text>
          </Link>
          <Text>Healthcare Products</Text>
        </Div>
        <Div>
          <Heading>Featured Categories</Heading>
          <Text>Mattresses</Text>
          <Text>Personal Care</Text>
          <Text>Healthcare Devices</Text>
          <Text>Top Products</Text>
          <Text>Health Food and Drinks</Text>
          <Text>Skin Care</Text>
          <Text>Mother and Baby Care</Text>
          <Text>Fitness Supplements</Text>
          <Text>Home Care</Text>
          <Text>Sexual Wellness</Text>
          <Text>Mega Clearance Sale</Text>
        </Div>
        <Div>
          <Heading>Need Help</Heading>
          <Text>Browse All Medicines</Text>
          <Text>Browse All Molecules</Text>
          <Text>Browse All Stores</Text>
          <Text>FAQs</Text>

          <Heading>Policy Info</Heading>
          <Text>Editorial Policy</Text>
          <Text>Terms And Conditions</Text>
          <Text>Customer Support</Text>
          <Text>Return Policy</Text>
        </Div>
        <Div>
          <Logo src={FooterLogo} />
          <Social>
            <Follow>Follow Us On</Follow>
            <SocialMedia>
              <Icons color="3B5998">
                <Facebook />
              </Icons>
              <Icons color="fa7e1e">
                <Instagram />
              </Icons>
              <Icons color="1DA1F2 ">
                <Twitter />
              </Icons>
              <Icons color="E60023">
                <Pinterest />
              </Icons>
            </SocialMedia>
          </Social>
        </Div>
      </Wrapper>
      <Copywrite>
        <Copyright />
        2023 MediSwift.All Rights Reserved
      </Copywrite>
    </Container>
  );
};

export default Footer;
