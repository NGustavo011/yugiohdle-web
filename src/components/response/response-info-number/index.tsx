import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

type ResponseInfoNumberProps = {
    chosenInfo: number | null,
    correctInfo: number | null
}

export const ResponseInfoNumber = ({chosenInfo, correctInfo}: ResponseInfoNumberProps)=>{
    const chosenInfoValue = chosenInfo !== null ? Number(chosenInfo) : 0;
    const correctInfoValue = correctInfo !== null ? Number(correctInfo) : 0;
    return (
        <>
            <div className={`${chosenInfo === correctInfo ? 'bg-green-700' : 'bg-red-700'} padding-4 h-20 flex justify-center items-center text-center`}>
                <div>
                    <p>{chosenInfoValue>correctInfoValue ? <IoMdArrowRoundDown /> : null}</p>
                    <p>{chosenInfoValue<correctInfoValue ? <IoMdArrowRoundUp /> : null}</p>
                </div>
                <p>{chosenInfoValue}</p>
            </div>
        </>
    )
}