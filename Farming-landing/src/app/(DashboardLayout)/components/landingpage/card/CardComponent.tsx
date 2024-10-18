import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Card = ({ title, description, imgSrc }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      className="w-full max-w-sm bg-gray-100 rounded-lg overflow-hidden shadow-lg relative mx-4 mb-6"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={{ borderRadius: '30px' }}
    >
      <div className="relative">
        <img
          src={imgSrc}
          alt="Card image"
          className={`w-full h-64 object-cover transition-all duration-300 ease-in-out ${
            isCardHovered ? 'transform scale-105' : ''
          }`}
          style={{ borderRadius: '40px', padding: '24px' }}
        />
      </div>
      <div className="p-6 pt-4">
        <h2 className="text-2xl font-black mb-2 text-gray-800 font-roboto">{title}</h2>
        <p className="text-gray-600 mb-0.5 font-semibold">{description}</p>
      </div>
      <div className="relative h-24">
        <div className="absolute inset-0 bg-gray-100">
          <svg
            className="absolute bottom-0 left-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="absolute bottom-4 left-6">
          <button
            className={`group flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
              isButtonHovered
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-800 border-gray-300'
            } border`}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <span>Learn More</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
                isButtonHovered ? 'bg-white' : 'bg-gray-200'
              }`}
            >
              <ArrowRight
                className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                  isButtonHovered ? 'text-gray-800 rotate-[-45deg]' : 'text-gray-600 rotate-[0deg]'
                }`}
                style={{ transform: isButtonHovered ? 'rotate(-45deg)' : 'rotate(0deg)' }}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Component() {
  const [isServiceHovered, setIsServiceHovered] = useState(false);

  const cardsData = [
    {
      title: 'Crop Health Prediction',
      description: `Get real-time insights into your crop's health by inputting environmental data. 
      Receive predictions on fertilizer needs and expected yields to make smarter farming decisions.`,
      imgSrc: '/images/landingpage/card1.png',
    },
    {
      title: 'Land Tool Renting',
      description: `Rent top-quality farming tools without ownership hassles. 
      Access the right equipment when needed, boosting your farm’s productivity efficiently.`,
      imgSrc: '/images/landingpage/card2.png',
    },
    {
      title: 'Land Renting',
      description: `List or find farmland for rent easily with secure transactions and contracts. 
      Connect with others and manage your land rental needs effortlessly.`,
      imgSrc: '/images/landingpage/card3.png',
    },
  ];

  return (
    <>
      <h2
        className="text-4xl font-bold text-center mb-16 transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsServiceHovered(true)}
        onMouseLeave={() => setIsServiceHovered(false)}
      >
        Unlock the Future of Agriculture{' '}
        <span
          className={`block h-1 bg-green-500 mt-2 transition-all duration-300 ease-in-out ${
            isServiceHovered ? 'w-48 mx-auto' : 'w-24 mx-auto'
          }`}
        ></span>
      </h2>
      <div className="flex flex-wrap gap-4 justify-center w-full px-4">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imgSrc={card.imgSrc}
          />
        ))}
      </div>
    </>
  );
}
