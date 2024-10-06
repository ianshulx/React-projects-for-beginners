import { useState } from "react" 
import { useEffect } from "react";
import axios from "axios";
import { SendMoney } from "./SendMoney";
import { jwtDecode } from "jwt-decode";

export const Users = () => {
  
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [signedInUser, setSignedInUser] = useState(null);

  //exclude signed in user need fix

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setSignedInUser(decoded.userId)
    }
  }, [])

  useEffect(() => {

    if (signedInUser !== null) {
      axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(response => {
          setUsers(response.data.user);
      });
    }
  }, [filter, signedInUser])

  return (
    <>
      <div className="font-primaryBold mt-6 text-2xl">
        Users
      </div>
      <div className="my-2"s> 
        <input onChange={(e) => {
          setFilter(e.target.value)
        }} type="text" placeholder="search users..." className="font-primaryLight w-full px-2 py-1 border rounded-sm border-slate-200 focus:outline-none focus:border-[#6D9886]" />
      </div>
      <div>
        {users.map(user => <SendMoney key={user._id} user={user}/>)}
      </div>
    </>
  )
}
