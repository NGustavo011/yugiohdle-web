import { Card } from "@/services/yugiohdle-api"

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
                            <img src={card.imageUrlSmall} alt={`${card.name} card`} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}