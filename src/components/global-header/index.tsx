"use client"
import { BiHome } from "react-icons/bi"

export const GlobalHeader = () => {
    const navigateToHome = () => {
        window.location.href = "/"
    }

    return (
        <>
            <div className="p-10 bg-stone-600 flex items-center justify-center mb-16 w-full">
                <BiHome className="hover:opacity-70 cursor-pointer size-8" onClick={navigateToHome} />
            </div>
            
        </>
    )
}