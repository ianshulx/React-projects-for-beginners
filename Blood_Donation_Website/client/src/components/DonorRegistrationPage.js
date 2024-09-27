// DonorRegistrationPage.js
import React from "react";
import DonorForm from "./DonorForm"; // Adjust the path based on your project structure

const DonorRegistrationPage = () => {
  console.log("DonorRegistrationPage rendered");
  const handleDonorRegistration = async (donorData) => {
    try {
      // Send donor data to your backend
      const response = await fetch("http://localhost:3000/donor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donorData),
      });

      if (response.ok) {
        console.log("Donor registered successfully");
        // Optionally, you can redirect or perform other actions after successful registration
      } else {
        console.error("Failed to register donor");
      }
    } catch (error) {
      console.error("Error during donor registration:", error.message);
    }
  };

  return (
    <div>
      <h1>Donor Registration</h1>
      <DonorForm onSubmit={handleDonorRegistration} />
    </div>
  );
};

export default DonorRegistrationPage;
