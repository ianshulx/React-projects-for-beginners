import React from "react";
import { data } from "../data/data.js";

const Work = () => {
  // projects file
  const project = data;
  //setProject(data);

  return (
    <div name="work" className="w-full  text-gray-300 bg-[#0a192f]">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600">
            Work
          </p>
          <p className="py-6">
            // Check out some of my recent work which i have posted on Youtube
            and hosted on Github
          </p>
        </div>

        {/* container for projects */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Gird Item */}
          {project.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "contain",
              }}
              className="shadow-lg shadow-slate-400 group container rounded-md flex justify-center text-center items-center mx-auto content-div mt-4 "
            >
              {/* Hover effect for images */}
              <div className="opacity-0 group-hover:opacity-100 ">
                <span className="text-2xl font bold text-white tracking-wider ">
                  {item.name}
                </span>
                <div className="pt-8 text-center ">
                  {/* eslint-disable-next-line */}
                  {item.live !== "" ? (
                    <a href={item.live} target="_blank">
                      <button
                        className="text-center rounded-lg px-4 py-3 m-2
                       bg-white text-gray-700 font-bold text-lg hover:bg-black hover:text-white"
                      >
                        Demo
                      </button>
                    </a>
                  ) : (
                    ""
                  )}

                  {item.link2 !== "" ? (
                    <a href={item.link2} target="_blank">
                      <button
                        className="text-center rounded-lg px-4 py-3 m-2
                       bg-white text-gray-700 font-bold text-lg  hover:bg-black hover:text-white"
                      >
                        Demo 2
                      </button>
                    </a>
                  ) : (
                    ""
                  )}

                  {item.github !== "not" ? (
                    <a href={item.github} target="_blank">
                      <button
                        className="text-center rounded-lg px-4 py-3 m-2
                       bg-white text-gray-700 font-bold text-lg  hover:bg-black hover:text-white"
                      >
                        Code
                      </button>
                    </a>
                  ) : (
                    "Code not available due to some Privacy factors"
                  )}

                  {/* eslint-disable-next-line */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
