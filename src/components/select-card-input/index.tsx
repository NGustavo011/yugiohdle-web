import { Card } from "@/services/yugiohdle-api"

type SelectCardInput = {
    cards: Card[]
}

export const SelectCardInput = ({cards}: SelectCardInput)=>{
    return (
        <select id="cardInput" name="cardInput" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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