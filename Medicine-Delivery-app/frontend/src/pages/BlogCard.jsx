import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  height: auto;
  width: 75%;
  margin-bottom: 3rem;
`;
const BlogImageWrapper = styled.div`
  height: 50%;
  width: 100%;
`;
const BlogImage = styled.img`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  height: auto;
  width: 95%;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  padding-bottom: 0.6rem;
  p {
    font-weight: 200;
    font-size: 0.87rem;
    color: #89898a;
  }
`;
const Category = styled.div`
  color: #89898a;

  font-size: 0.9rem;
  font-weight: 300;
  padding-top: 15px;
  padding-bottom: 0.5rem;
`;
const Subscribe = styled.h1`
  fontSize: 1.3rem;
  color: #464748;
  fontWeight: 400;
  paddingBottom: 0.5rem;
`;


const BlogCard = (props) => {
  return (
    <Container>
      <BlogImageWrapper>
        <BlogImage src={props.imgsrc}></BlogImage>
      </BlogImageWrapper>
      <Content>
        <Category>{props.category}</Category>
        <Subscribe>{props.title}</Subscribe>
        <p>{props.textContent}</p>
      </Content>
    </Container>
  );
};

export default BlogCard;
