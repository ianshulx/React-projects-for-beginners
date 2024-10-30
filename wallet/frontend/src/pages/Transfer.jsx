import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

export const Transfer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  return <div className="flex justify-center bg-[#eeeeee] h-screen">
    <div className="flex h-full flex-col justify-center">
      <div className="bg-white border p-4 space-y-4 shadow-lg rounded-md w-96 max-w-md">
        <div className="flex flex-col space-y-2 p-3">
          <h2 className="text-3xl font-primaryBold text-center">Send Money</h2>
          <h3 className="font-primaryLight text-center"><span className="underline cursor-pointer">invite</span> friend's, and earn $5</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#6D9886] flex items-center justify-center">
              <span className="text-2xl text-white font-primaryLight">{name[0]}</span>
            </div>
            <h3 className="text-2xl font-primaryMedium">{name}</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2 pt-4">
              <label className="text-sm font-primaryMedium">
                Amount (in $)
              </label>
              <input onChange={(e) => {
                setAmount(e.target.value);
              }}
                type="number"
                className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:border-[#6d9886]"
                id="amount"
              />
            </div>
            <button onClick={() => {
              axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
              }, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              })
              navigate("/dashboard")
            }} className="justify-center rounded-md text-sm font-primaryMedium ring-offset-background transition-colors h-10 px-4 py-3 w-full bg-[#6D9886] text-white">
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}
