import { Link } from "react-router-dom"


export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="flex justify-center text-sm font-primaryLight">
      <div className="text-zinc-500">
        {label}
      </div>
      <Link className="cursor-pointer underline pl-1 font-primaryMedium" to={to}>
        {buttonText}
      </Link>
    </div>
  )
}
