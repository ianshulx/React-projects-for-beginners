import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PassInput } from "../components/PassInput";

export const Signin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard')
  }

  return (
    <div className="bg-[#eeeeee] h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-md p-2 w-80 px-4 h-max text-center">
          <Heading label={"Sign in"} />
          <SubHeading label={"enter your credentials to access your account"} />
          <div className="pt-2 pb-2">
            <InputBox label={"Email"} onChange={e => {
              setUsername(e.target.value);
            }} />
            <PassInput label={"Password"} onChange={(e) => {
              setPassword(e.target.value);
            }}/>
          </div>
          <div className="pt-4">
            <Button onClick={handleSignin} label={"Sign in"} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}
