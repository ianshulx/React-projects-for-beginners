import React from "react";

// import image
import Image2 from "../assets/img/feature-2-img.png";

const FeaturesSection2 = () => {
  return (
    <section className="py-[30px] lg:py-[120px]">
      <div className="container mx-auto">
        <div className="flex flex-col justify-end items-center lg:flex-row">
          {/* image */}
          <div
            className="flex-1 lg:absolute lg:left-0 order-2 lg:order-1"
            data-aos="fade-right"
            data-aos-offset="400"
          >
            <img src={Image2} alt="" />
          </div>
          {/* text */}
          <div
            className="flex-1 max-w-[456px]"
            data-aos="fade-left"
            data-aos-offset="400"
          >
            <h3 className="h3 mb-6 ">Detailed Statistics</h3>
            <p className="text-gray mb-8">
              View all mining related information in realtime, at any point at
              any location and decide which polls you want to mine in.
            </p>
            <button className="btn px-8 mb-6 lg:mb-0">Learn more</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection2;
