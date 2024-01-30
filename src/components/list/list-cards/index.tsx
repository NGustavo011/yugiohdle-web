import { Card } from "@/services/yugiohdle-api"
import Image from "next/image"

type ListCardsProps = {
    filteredCards: Card[],
}

export const ListCards = ({filteredCards}: ListCardsProps) => {
    return (
        <>
            <div className="grid grid-cols-8 gap-4">
                {filteredCards.map((card)=>{
                    return (
                        <div key={card.id}>
                            <Image src={card.imageUrlSmall} alt={`${card.name} card`} width={200} height={300} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}