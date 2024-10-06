export const Button = ({label, onClick}) => {
  return <button onClick={onClick} type="button" className="font-primaryRegular w-full bg-[#222831] text-white hover:bg-[#31363F] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"> {label} </button>
}

