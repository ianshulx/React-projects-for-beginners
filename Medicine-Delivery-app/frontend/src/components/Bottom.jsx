import React from "react";
import styled from "styled-components";
import Logoo from "../images/Logo.png";
import "../index.css";
import {
  FaGooglePlay,
  FaApple,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";
const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  position: static;
`;
const GridWrapper = styled.div`
  position: static;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  background-color: #03b0be;
`;
const Logo = styled.img`
  height: 40%;
`;
const First = styled.div`
  margin-top: 1rem;
  margin-left: 6rem;
`;
const Second = styled.div``;
const Third = styled.div``;
const Fourth = styled.div`
  padding: 2.5rem 0rem 0rem 0rem;
`;
const SearchWrapper = styled.div`
  border-radius: 10px;
  height: 35px;
  width: 27rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  margin-bottom: 10px;
`;
const SerachInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  font-size: 16px;
  &:focus-visible {
    outline: none;
  }
`;
const Button = styled.button`
  display: flex;
  flex-direction: row;
  padding: 2%;
  background-color: #292727;
  border-radius: 15px;
  border: none;
  span {
    font-size: 0.8rem;
    color: #bcb6b6;
  }
  p {
    font-size: 1rem;
    color: #ffffff;
    font-weight: 700;
  }
  .Button-Context {
    text-align: left;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Options = styled.a`
  display: block;
  padding: 2.5rem 0rem 0rem 0rem;
  color: white;
  font: 1rem;
`;
const Subscribe = styled.button`
  background-color: white;
  color: #03b0be;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  border: none;
  border-radius: 10px;
`;
const IconsWrapper = styled.div`
  display: inline;
  position: relative;
  top: 3px;
`;
const Bottom = () => {
  return (
    <>
      <Container>
        <GridWrapper>
          <First>
            <Logo src={Logoo} />
            <h1
              style={{
                fontSize: "1.3rem",
                color: "white",
                marginBottom: "5px",
              }}
            >
              Download The App for Free!
            </h1>

            <ButtonWrapper>
              <Button style={{ marginRight: "8px" }}>
                <div className="Button-Icon">
                  <FaGooglePlay
                    style={{
                      color: "white",
                      fontSize: "1.6rem",
                      marginRight: "5px",
                      alignItems: "center",
                      paddingTop: "5px",
                    }}
                  />
                </div>
                <div className="Button-Context">
                  <span>Get it On</span>
                  <br />
                  <p> Google Play</p>
                </div>
              </Button>
              <Button>
                <div className="Button-Icon">
                  <FaApple
                    style={{
                      color: "white",
                      fontSize: "1.8rem",
                      marginRight: "5px",
                      alignItems: "center",
                      paddingTop: "2px",
                    }}
                  />
                </div>
                <div className="Button-Context">
                  <span>Download on the</span>
                  <br />
                  <p> App Store</p>
                </div>
              </Button>
            </ButtonWrapper>
            <br />
            <h1
              style={{
                fontSize: "1.5rem",
                color: "white",
              }}
            >
              Follow Us On
              <IconsWrapper>
                <FaTwitter
                  style={{
                    fontSize: "1.5rem",
                    marginLeft: "15px",
                    marginRight: "10px",
                  }}
                />
                <FaInstagram
                  style={{ fontSize: "1.5rem", marginRight: "10px" }}
                />
                <FaFacebookF style={{ fontSize: "1.5rem" }} />
              </IconsWrapper>
            </h1>
          </First>
          <Second>
            <Options>About Us</Options>
            <Options>Our Editorial Policy</Options>
            <Options>Privacy Policy</Options>
          </Second>
          <Third>
            <Options>Contact Us</Options>
            <Options>Shop At MediSwift</Options>
            <Options>Careers</Options>
          </Third>
          <Fourth>
            <h1
              style={{
                fontSize: "1.3rem",
                color: "white",
                marginBottom: "10px",
              }}
            >
              Subscribe to information on daily health tips & updates
            </h1>
            <SearchWrapper>
              <SerachInput
                type="text"
                placeholder="Enter Your Email ID"
              ></SerachInput>
            </SearchWrapper>
            <p
              style={{
                color: "white",
                fontSize: "0.8rem",
                marginBottom: "10px",
              }}
            >
              By Subscribing you agree to the Terms of Use and Privacy Policy
            </p>
            <Subscribe>Subscribe</Subscribe>
          </Fourth>
        </GridWrapper>
      </Container>
    </>
  );
};

export default Bottom;
