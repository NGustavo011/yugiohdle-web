import { ReactNode } from "react"

export type CardModeProps = {
    title: string
    children: ReactNode
}

export const CardMode = ({title, children}: CardModeProps) => {
    return (
        <>
            <div className="flex justify-center flex-col items-center bg-gray-500 rounded-md py-5 gap-4">
                <p>{title}</p>
                {children}
            </div>
        </>
    )
}