import React from "react";
import styled from "styled-components";
import fat from "../images/fat.png";
import { FaHandHoldingMedical, FaFilePrescription } from "react-icons/fa6";
import { FcOnlineSupport } from "react-icons/fc";
import { GrTest } from "react-icons/gr";
import Navbar from "../components/Navbar";
import Bottom from "../components/Bottom";
import BlogCard from "./BlogCard";
import image1 from "../images/DIETER.jpg";
import image2 from "../images/random.jpg";
import image3 from "../images/Objects.jpg";
import Newsletters from "../pages/Newsletter";

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  background-color: white;
  width: 100%;
  position: static;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
`;

const Heading = styled.div`
  margin: 25px 0px;
  font-weight: 700;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding-left: 4rem;
`;

const Image = styled.img`
  height: 50vh;
  width: 100%;
  border-radius: 15px;
`;
const TextContent = styled.p`
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  color: #89898a;
  font-weight: 500;
  width: 100%;
`;
const Left = styled.div``;
const BlogHeading = styled.h1`
  paddingtop: 0.3rem;
  fontsize: 2rem;
  color: #464748;
  margin-bottom: 10px;
`;
const Author = styled.p`
  color: #979b9e;
  fontweight: 400;
  paddingtop: 0.7rem;
  margin-bottom: 5px;
`;

const Right = styled.div`
  background-color: #ffffff;
`;

const Services = styled.h1`
  paddingtop: 3rem;
  fontsize: 2rem;
  color: #464748;
  margin-bottom: 10px;
  font-weight: 600;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  color: #464748;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 10px;
  width: 80%;
  height: 7vh;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const BtnIcon = styled.div`
  padding-left: 0.8rem;
  padding-right: 3rem;
  font-size: 2rem;
`;
const LastButton = styled.div`
  margin-bottom: 4rem;
`;
const BtnText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;
const ContentRight = styled.div`
  padding-left: 2rem;
`;
// const SerachInput = styled.input`
//   width: 90%;
//   margin-left: -2rem;
//   height: 100%;
//   font-size: 16px;
//   border: none;
//   border-bottom: 2px #03b0be solid;
//   &:focus-visible {
//     outline: none;
//   }
// `;

const Blogs = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Heading>Health Blogs</Heading>
        <Content>
          <Grid>
            <Left>
              <BlogHeading>10 Tips For Faster Fat Loss.</BlogHeading>
              <Author>By Nilesh Balotiya, Published on 14th August 2022</Author>
              <Image src={fat}></Image>
              <TextContent></TextContent>
            </Left>

            <Right>
              <ContentRight>
                <Services>Our Services</Services>

                <Button>
                  <BtnIcon>
                    <FaHandHoldingMedical />
                  </BtnIcon>
                  <BtnText>
                    <p>Buy MediSwift Products</p>
                  </BtnText>
                </Button>

                <Button>
                  <BtnIcon>
                    <FcOnlineSupport />
                  </BtnIcon>
                  <BtnText>
                    <p>Online Consultations</p>
                  </BtnText>
                </Button>

                <Button>
                  <BtnIcon>
                    <GrTest />
                  </BtnIcon>
                  <BtnText>
                    <p>Lab Tests</p>
                  </BtnText>
                </Button>

                <LastButton>
                  <Button>
                    <BtnIcon>
                      <FaFilePrescription />
                    </BtnIcon>
                    <BtnText>
                      <p>Upload Prescription</p>
                    </BtnText>
                  </Button>
                </LastButton>
                
                <Services>Recommended Blogs</Services>
                <BlogCard
                  imgsrc={image1}
                  category={"General Health"}
                  title={"Electrolyte : 10 Benefits"}
                  textContent={
                    "Well, this is primarily because of anaesthesia. Modern-day anaesthesia is a highly advanced combination drug which, when given in just the right amount, slowly numbs your body, absolving you from any experience or memory of pain whatsoever during the surgery.any experience or memory of pain whatsoever during the surgery. "
                  }
                />
                <BlogCard
                  imgsrc={image2}
                  category={"FAT loss"}
                  title={"10 Days No Sugar Challenge For Instant Results"}
                  textContent={
                    "Well, this is primarily because of anaesthesia. Modern-day anaesthesia is a highly advanced combination drug which, when given in just the right amount, slowly numbs your body, absolving you from any experience or memory of pain whatsoever during. "
                  }
                />
                <BlogCard
                  imgsrc={image3}
                  category={"Dwahuwdu"}
                  title={"10 Toys fors Kids"}
                  textContent={
                    "Well, this is primarily because of anaesthesia. Modern-day anaesthesia is a highly advanced combination drug which, when given in just the right amount, slowly numbs your body, absolving you from any experience or memory of pain whatsoever during. "
                  }
                />
                <Newsletters />
              </ContentRight>
            </Right>
          </Grid>
        </Content>
      </Container>
      <Bottom />
    </>
  );
};

export default Blogs;
