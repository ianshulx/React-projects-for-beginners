import React from "react";
import styled from "styled-components";


const Subscribe = styled.button`
  background-color: #03b0be;
  color: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  border: none;
  border-radius: 10px;
  margin-top: 1rem;
`;
const Newsletter = styled.div`
  height: auto;
  width: 75%;
  h1 {
    color: #464748;
    font-weight: 400;
    margin-bottom: 1rem;
  }
`;
// const Services = styled.h1`
//   padding-top: 3rem;
//   font-size: 2rem;
//   color: #464748;
//   margin-bottom: 10px;
//   font-weight: 700;
// `;
const SearchWrapper = styled.div`
  border-radius: 10px;
  height: 5vh;
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  margin-bottom: 10px;
`;
const SerachInput = styled.input`
  width: 90%;
  margin-left: -2rem;
  height: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 2px #03b0be solid;
  &:focus-visible {
    outline: none;
  }
`;

const NewsletterWrapper = styled.div`
  padding-left: 1rem;
  box-shadow: 2px 14px 24px rgba(0, 0, 0, 0.2);
  border-radius: 1.5rem;
  color: #464748;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  margin-bottom: 5rem;
  p {
    font-size: 1rem;
    padding-bottom: 0.5rem;
  }
`;
const NewSubscribe = () => {
  return (
    <Newsletter>
      <h1 style={{ color: "#464748", marginBottom: "10px", fontWeight: "600" }}>
        Subscribe to Newsletter
      </h1>
      <NewsletterWrapper>
        <p>Sign up for our free Health Library Daily Newsletter</p>
        <p>Get doctor-approved health tips, news, and more.</p>
        <br />
        <p style={{ fontSize: "1.3rem" }}>Email</p>
        <SearchWrapper>
          <SerachInput
            type="text"
            placeholder="Enter Your Email ID"
          ></SerachInput>
        </SearchWrapper>
        <Subscribe>Subscribe</Subscribe>
      </NewsletterWrapper>
    </Newsletter>
  );
};
export default NewSubscribe;
