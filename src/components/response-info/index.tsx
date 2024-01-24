type ResponseInfoProps = {
    chosenInfo: string | number | null,
    correctInfo: string | number | null
}

export const ResponseInfo = ({chosenInfo, correctInfo}: ResponseInfoProps)=>{
    return (
        <>
            <div className={`${chosenInfo === correctInfo ? 'bg-green-700' : 'bg-red-700'} padding-4 h-20 flex justify-center items-center text-center`}>{chosenInfo !==null ? chosenInfo?.toString().toUpperCase() : "N/A"}</div>
        </>
    )
}