import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const ComponentName = () => {
  // Animation variants for text
  const textAnimation = {
    hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, staggerChildren: 0.05 },
    },
  };

  // Animation variants for each letter
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="relative bg-white">
        <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
          <img
            className="w-auto h-full"
            src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
            alt="Background Pattern"
          />
        </div>

        <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
              <div className="text-center lg:text-left lg:pr-0 flex-1">
                <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                  <motion.div initial="hidden" animate="visible" variants={textAnimation}>
                    <motion.h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight">
                      {'Boost Your Farm with Cutting-Edge Tools'.split('').map((letter, idx) => (
                        <motion.span key={idx} variants={letterAnimation}>
                          {letter}
                        </motion.span>
                      ))}
                    </motion.h1>
                  </motion.div>
                  <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                    <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                      <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="/images/landingpage/profile1.jpeg"
                        alt=""
                      />
                      <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="/images/landingpage/profile2.jpg"
                        alt=""
                      />
                      <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="/images/landingpage/profile3.jpg"
                        alt=""
                      />
                    </div>
                    <div className="mt-6 lg:mt-10 lg:flex lg:items-center">
                      <p className="mt-4 text-base text-gray-900 lg:mt-0 lg:ml-4 font-pj">
                        Join our community of <span className="font-bold">farmers</span> and access
                        a range of services designed to improve your farming experience and
                        productivity.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-10">
                    <a
                      href="#rent-your-land"
                      className="inline-flex items-center px-6 py-3 text-base font-bold text-white transition-all duration-300 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justify-center hover:bg-transparent hover:border-gray-900 hover:text-black"
                    >
                      Explore Land Rentals
                    </a>

                    <a
                      href="#crop-health"
                      className="inline-flex items-center px-4 py-3 mt-4 text-base font-bold transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj justify-center rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-200 focus:bg-gray-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                      Get Crop Health Insights
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 lg:ml-8 flex justify-end items-center">
                <img
                  className="w-full max-w-2xl rounded-lg"
                  src="images/landingpage/guru-moorthy-gokul-K_AhXLfVuN8-unsplash.png"
                  alt="Agricultural Insights"
                  style={{
                    height: 'auto',
                    width: 'auto',
                    maxWidth: '100%',
                    paddingRight: '0',
                    paddingleft: '40px',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div style={{ marginbutto: '25vh' }}>
        <img
          src="images/text.svg"
          alt="Agricultural Insights"
          style={{ height: 'auto', width: '100%' }}
        />
      </div>
    </>
  );
};

export default ComponentName;
