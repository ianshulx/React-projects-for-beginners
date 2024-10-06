import axios from "axios";
import { useEffect, useState } from "react"

export const Appbar = () => {

  return (
    <div className="flex justify-between shadow h-14">
      <div className="flex flex-col justify-center h-full ml-4 font-primaryBold text-3xl">
        Wallet
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-4 font-primaryMedium text-lg">
          hello, 
        </div>
        <div className="flex justify-center bg-[#DDDDDD] rounded-full h-12 w-12 mt-1 mr-2">
          <div className="flex flex-col justify-center text-lg">
            u
          </div>
        </div>
      </div>
    </div>
  )
}
