import Link from "next/link"

type ButtonModeProps = {
    title: string,
    href: string
}

export const ButtonMode = ({title, href}: ButtonModeProps) => {
    return (
        <>
            <div className="flex justify-center">
                <Link
                    key={title}
                    href={href}
                    className="flex h-[48px] w-[200px] items-center justify-center rounded-md bg-gray-50 p-3 hover:bg-sky-100 text-blue-600"
                >
                    <p className="hidden md:block">{title}</p>
                </Link>
            </div>
        </>
    )
}