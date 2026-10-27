import Logo from "../../components/Logo"
import Modal from "../../components/Modal"

export default function Hero() {
    return (
        <>
            <div className="hero-container mt-32 z-0 relative my-5">


                <div className="px-32 max-h-320">
                    <img src="heroSection/paan-corner.webp" alt="" className={"cursor-pointer"}/>
                </div>

                <div className={"px-32"}>
                    <div
                        className="mt-5 w-full min-w-0 overflow-x-auto overflow-y-hidden scrollbar-hide">
                        <div className={"flex w-max gap-5"}>
                            <img src="heroSection/printoutsDelivered.png" alt="" className="h-48 w-auto flex-none cursor-pointer"/>
                            <img src="heroSection/babycare-WEB.avif" alt="" className="h-48 w-auto flex-none cursor-pointer"/>
                            <img src="heroSection/Pet-Care_WEB.avif" alt="" className="h-48 w-auto flex-none cursor-pointer"/>
                            <img src="heroSection/pharmacy-WEB.avif" alt="" className="h-48 w-auto flex-none cursor-pointer"/>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}