import Image from "next/image"

type ResponseInfoImageProps = {
    chosenInfoImage: string
}

export const ResponseInfoImage = ({chosenInfoImage}: ResponseInfoImageProps)=>{
    return (
        <>
            <div className={`padding-4 h-20 flex justify-center items-center text-center`}>
                <Image src={chosenInfoImage} alt={`${chosenInfoImage} card image`} width={80} height={80} />
            </div>
        </>
    )
}