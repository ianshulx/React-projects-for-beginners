import React from "react";

const ReviewCard = (props) => {
  return (
    <div className=" flex flex-col w-full lg:w-2/6 bg-white p-3 rounded-lg gap-5">
      <div className=" flex flex-row items-center lg:justify-start justify-center">
        <div className="w-1/5 flex justify-center mx-4">
          <img className=" rounded-full w-16" src={props.img} alt="img" />
        </div>
        <div className="">
          <h2 className=" font-semibold text-lg">{props.title}</h2>
          <div className=" flex">
            <p className="text-textColor">{props.username}</p>
          </div>
        </div>
      </div>
      <p className="text-textColor">{props.desc}</p>
    </div>
  );
};

export default ReviewCard;
