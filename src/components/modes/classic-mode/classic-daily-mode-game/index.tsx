"use client"
import { Card, Response } from "@/services/yugiohdle-api"
import { FormEvent, useState } from "react"
import { SelectCardInput } from "../../../select-card-input"
import { ListCardsButton } from "@/components/list/list-cards-button"
import { ClassicResponses } from "../classic-responses"

type ClassicDailyModeGameProps = {
    cards: Card[],
    dailyCard: Card
}

interface ClassicDailyModeGameElements extends HTMLFormControlsCollection {
    cardInput: HTMLInputElement;
}
  
interface ClassicDailyModeGameForm extends HTMLFormElement {
    readonly elements: ClassicDailyModeGameElements;
}

export const ClassicDailyModeGame = ({cards, dailyCard}: ClassicDailyModeGameProps) => {
    const [filteredCards, setFilteredCards] = useState<Card[]>(cards)
    const [responses, setResponses] = useState<Response[]>([])
    const [winned, setWinned] = useState(false)
    const onSubmit = (
        e: FormEvent<ClassicDailyModeGameForm>
        ) => {
        e.preventDefault()
        
        const cardId = e.currentTarget.elements.cardInput.value
        const chosenCard: Card = cards.find(card => card.id === cardId) as Card
        const response = {
            chosenCard: chosenCard, 
            correctCard: dailyCard
        }
        setResponses([...responses, response])
        if(cardId===dailyCard.id){
            console.log("ACERTOU MISERAVI")
            setWinned(true)
        } else{
            console.log("ERROU NEWBIE")
        }
    }

    return (
        <>   
            <div className="flex flex-col justify-center items-center w-full">
                <ListCardsButton originalCards={cards} filteredCards={filteredCards} setFilteredCards={setFilteredCards} />
                <form onSubmit={(onSubmit)} className="w-full">
                    <SelectCardInput cards={cards} />
                    <button type="submit" disabled={winned}>Submit</button>
                    <ClassicResponses responses={responses} />
                </form>
            </div>
        </>
    )
}