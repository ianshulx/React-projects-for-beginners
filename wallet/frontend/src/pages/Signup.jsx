import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { PassInput } from "../components/PassInput"

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-[#EEEEEE] h-screen flex justify-center">
      <div className="flex flex-col justify-center" >
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-6">
          <Heading label={"Sign up"} />
          <SubHeading label={"enter your information to create an account."} />
          <div className="pt-4 pb-2">
            <InputBox onChange={(e) => {
              setFirstName(e.target.value);
            }} label={"First Name"} />
            <InputBox onChange={(e) => {
              setLastName(e.target.value);
            }} label={"Last Name"} />
            <InputBox onChange={(e) => {
              setUsername(e.target.value);
            }} label={"Email"} />
            <PassInput onChange={(e) => {
              setPassword(e.target.value)
            }} label={"Password"}/>
          </div>
          <div className="pt-4">
            <Button onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
              });
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            }} label={"Sign up"} />
          </div>
          <BottomWarning label={"already have an account?"} buttonText={"sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}
