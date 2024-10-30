import { useNavigate } from "react-router-dom"
import { Button } from "./Button"


export const SendMoney = ({user}) => {

    const navigate = useNavigate();

    return <div className="flex justify-between font-primaryMedium">
        <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-lg">
                        {user.firstName[0]}
                    </div>
                </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div> 
        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);            
            }} label={"Send Money"} />
        </div>
    </div>
}
