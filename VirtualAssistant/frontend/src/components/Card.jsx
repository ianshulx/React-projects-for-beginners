import React from 'react';

function Card({ image }) {
    return (
        <div className="bg-[#030326] border-2 border-blue-500 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-[0_10px_25px_rgba(0,0,255,0.5)] cursor-pointer
            w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] mx-auto">
            <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
    );
}

export default Card;
