import { Card } from "@/services/yugiohdle-api"

type SelectCardInput = {
    cards: Card[]
}

export const SelectCardInput = ({cards}: SelectCardInput)=>{
    return (
        <select id="cardInput" name="cardInput">
            {
                cards.map((card)=>{
                    return (
                        <option key={card.id} value={card.id}>{card.name}</option>
                    )
                })
            }
        </select>
    )
}