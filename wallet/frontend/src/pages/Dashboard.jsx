import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { Logout } from "../components/Logout"

export const Dashboard = () => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("http://localhost:3000/api/v1/account/balance", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const formattedBalance = parseFloat(response.data.balance).toFixed(2);
        setBalance(formattedBalance);
      })
      .catch(error => {
        console.error("Error fetching balance:", error);
      });
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8 flex justify-between">
        <div className="w-1/2">
          <Users />
        </div>
        <div className="w-1/3 bg-white rounded-lg shadow-md p-6 h-60">
          <Balance value={balance} />
        </div>
        <Logout />
      </div>
    </div>
  )
}
