import React from "react";
import styled from "styled-components";
import LabTestCards from "./LabTestCards";
const Container = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;
const Content = styled.div`
  margin: auto;
  padding-left: 3rem;
  margin-left: 0rem;
  padding-top: 3rem;
  margin-right: 3rem;
`;
const Info = styled.p`
  color: #151b3999;
  padding-left: 2.5rem;
  padding-bottom: 2rem;
`;
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 2rem;
`;
const LabTests = () => {
  return (
    <Container>
      <Content>
        <h1
          style={{
            color: "#464748",
            paddingBottom: "1rem",
            paddingLeft: "2.5rem",
          }}
        >
          Lab Tests
        </h1>
        <Info>Genuine and Accurate Tests at Best Price</Info>
        <CardContainer>
          <LabTestCards
            Name={"MediSwift Swasthya"}
            content={
              "Book Regular Health Check-up Package MediSwift Swasthya, a Basic Screening Preventive Health Check-up Profile having 64 tests includes Diabetic, Lipid, LFT, KFT, Thyroid with Vitamins, & more."
            }
            price={"Rs.1699"}
            discount={"Rs.899"}
            color="#fff4eb"
          />
          <LabTestCards
            Name={"MediSwift Shield Pack"}
            content={
              "Shield Pack helps to protect against a particular danger or risk. It screens the most common diseases like CBC, Urine Routine, Creatinine, Uric Acid, FBS, HbA1c, Lipid profile, Total Bilirubin, SGPT, TSH and Calcium."
            }
            price={"Rs.799"}
            discount={"Rs.439"}
            color="#f6fae8"
          />
          <LabTestCards
            Name={"MediSwift Health Pack"}
            content={
              "Health check-ups are very useful in the early detection of all types of illnesses and risk factors. Simple to understand and less time consuming, our MediSwift Health Pack comprises 35 parameters of regular blood tests that have been specially designed keeping your health in mind."
            }
            price={"Rs.1500"}
            discount={"Rs.899"}
            color={"#eafaff"}
          />
          <LabTestCards
            Name={"MediSwift Diabetic Checkup"}
            content={
              "Meant for people who want to get regular reports to prevent/check their diabetes levels. It includes 49 tests."
            }
            price={"Rs.999"}
            discount={"Rs.629"}
            color={"#ebfffc"}
          />
          <LabTestCards
            Name={"Aarogyam B"}
            content={
              "Preventive Basic Health Check-up Package Aarogyam B Consists of 67 blood tests for screening of the health status."
            }
            price={"Rs.1400"}
            discount={"Rs.1050"}
            color={"#ebfffc"}
          />
          <LabTestCards
            Name={"MediSwift Healthy"}
            content={
              "This package is specially designed for an elderly male and includes major blood tests which are required for diagnosis, evaluation and includes one of the important tumour markers which is responsible for a cancerous growth common in elderly male age group."
            }
            price={"Rs.999"}
            discount={"Rs.849"}
            color={"#f6fae8"}
          />
          <LabTestCards
            Name={"MediSwift Pre-Screening"}
            content={
              "MediSwift Pre-Screening helps to evaluate against common illness /infection of blood / urine / stool and also determines blood group of a person which is an important parameter required in cases of anaemia (due to chronic blood loss) and for identity."
            }
            price={"Rs.599"}
            discount={"Rs.509"}
            color={"#fff4eb"}
          />
          <LabTestCards
            Name={"MediSwift Immunity Care"}
            content={
              "Health test to test for issues related to hormones, fertility and pregnancy along with tests for diabetes, cardiovascular illnesses etc. This health includes seven major parameters."
            }
            price={"Rs.1499"}
            discount={"Rs.1109"}
            color={"#eafaff"}
          />
        </CardContainer>
      </Content>
    </Container>
  );
};
export default LabTests;
