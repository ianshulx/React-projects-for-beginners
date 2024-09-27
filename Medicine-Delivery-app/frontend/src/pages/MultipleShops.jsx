import React from "react";
import styled from "styled-components";
import ShopCard from "../components/ShopCard";
const Container = styled.div``;
const CardContainer = styled.div`
  padding: 2rem 2.4rem 2rem 2.8rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const MultipleShops = () => {
  return (
    <Container>
      <h1
        style={{
          color: "#464748",
          paddingTop: "3rem",
          paddingLeft: "4rem",
        }}
      >
        Nearby Pharmacies
      </h1>
      <CardContainer>
        <ShopCard
          link={
            "https://media.istockphoto.com/id/1135284188/photo/if-you-need-its-here.jpg?s=612x612&w=0&k=20&c=2yfZHUqTEGW4-5r4Sc4pzWKx0DtubpdbTkX3h_w1AJg="
          }
          name={"MediQuick Pharmacy"}
          desc={"Swift Solutions for Better Health"}
          addr={"123 Oak Street, Suite 101, Springfield, IL 62701"}
          rating={"⭐⭐⭐⭐⭐"}
        />
        <ShopCard
          link={
            "https://img.freepik.com/free-photo/warehouse-pharmacy_1161-231.jpg"
          }
          name={"HealthHub Rx"}
          desc={"Your Wellness, Our Priority."}
          addr={"456 Maple Avenue, Unit A, Willowbrook, CA 90210"}
          rating={"⭐⭐⭐⭐"}
        />
        <ShopCard
          link={
            "https://previews.agefotostock.com/previewimage/medibigoff/a4ea512b9f2a7b10f563497591d888d7/rdc-ad_135260.jpg"
          }
          name={"VitalSolutions Pharmacy"}
          desc={"Quick Relief, Caring Service"}
          addr={"789 Elm Street, Building B, Vitalityville, NY 10001"}
          rating={"⭐⭐⭐⭐⭐"}
        />
        <ShopCard
          link={
            "https://img.freepik.com/premium-photo/let-us-help-you-fight-winter-blues-rearview-shot-young-woman-purchasing-counter-medication-from-female-pharmacist_590464-22126.jpg"
          }
          name={"CureFirst Drugstore"}
          desc={"Your Health, Our Commitment."}
          addr={"321 Cedar Lane, Health Haven, TX 75001"}
          rating={"⭐⭐⭐⭐"}
        />
        <ShopCard
          link={
            "https://img.freepik.com/free-photo/warehouse-pharmacy_1161-231.jpg"
          }
          name={"HealthHub Rx"}
          desc={"Your Wellness, Our Priority."}
          addr={"456 Maple Avenue, Unit A, Willowbrook, CA 90210"}
          rating={"⭐⭐⭐⭐"}
        />

        <ShopCard
          link={
            "https://previews.agefotostock.com/previewimage/medibigoff/a4ea512b9f2a7b10f563497591d888d7/rdc-ad_135260.jpg"
          }
          name={"VitalSolutions Pharmacy"}
          desc={"Quick Relief, Caring Service"}
          addr={"789 Elm Street, Building B, Vitalityville, NY 10001"}
          rating={"⭐⭐⭐⭐⭐"}
        />
        <ShopCard
          link={
            "https://img.freepik.com/free-photo/warehouse-pharmacy_1161-231.jpg"
          }
          name={"HealthHub Rx"}
          desc={"Your Wellness, Our Priority."}
          addr={"456 Maple Avenue, Unit A, Willowbrook, CA 90210"}
          rating={"⭐⭐⭐⭐"}
        />
        <ShopCard
          link={
            "https://previews.agefotostock.com/previewimage/medibigoff/a4ea512b9f2a7b10f563497591d888d7/rdc-ad_135260.jpg"
          }
          name={"VitalSolutions Pharmacy"}
          desc={"Quick Relief, Caring Service"}
          addr={"789 Elm Street, Building B, Vitalityville, NY 10001"}
          rating={"⭐⭐⭐⭐⭐"}
        />
      </CardContainer>
    </Container>
  );
};
export default MultipleShops;
