import { Card } from "@/services/yugiohdle-api"

type ListCardsProps = {
    cards: Card[]
}

export const ListCards = ({cards}: ListCardsProps) => {
    return (
        <>
            <div className="grid grid-cols-8 gap-4">
                {cards.map((card)=>{
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