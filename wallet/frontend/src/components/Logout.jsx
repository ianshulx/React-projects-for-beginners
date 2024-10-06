import { useNavigate } from "react-router-dom";

export const Logout = () => {

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/signin')
    }

    return <div className="fixed bottom-4 right-4">
        <div className="bg-[#DDDDDD] rounded-full h-12 w-12 mt-1 mr-2 text-center flex justify-center">
            <button onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
            </button>           
        </div>
    </div>
}