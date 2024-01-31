type ResponseHeaderProps = {
    title: string
}

export const ResponseHeader = ({title}: ResponseHeaderProps)=>{
    return (
        <>
            <div className="bg-gray-500 h-12 flex justify-center items-center text-center">{title.toUpperCase()}</div>
        </>
    )
}