import React from "react";
import Devs from "../layouts/DevsCards";
import img1 from "../assets/img/img.png";
import img2 from "../assets/img/shweta.png";
import img3 from "../assets/img/yash.png";

const Review = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor ">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 ">
        Developer's
      </h1>

      <div className=" flex flex-col lg:flex-row gap-5 justify-center py-4 my-8">
        <Devs img={img1} title="Ravi" username="@mrravipandee" desc="Hello! I'm Ravi Pandey, and I contributed to this project. I used React and Tailwind, and we achieved the best UI through Shweta, who made excellent color selections to get this amazing output." />
        <Devs img={img2} title="Shweta" username="@shweta1817" desc="I'm Shweta Bandawane. I suggested the UI and identified the functions that would help make this product. I'm not a UI/UX designer; I just try helped her to achieve the best outcome." />
        <Devs img={img3} title="Yash" username="@jejurkaryash" desc="I am Yash Jejurkar. I am learning the MERN stack and needed help with this project. I gave it my best effort and wrote a few lines of code to integrate AI into the project." />
      </div>
    </div>
  );
};

export default Review;
