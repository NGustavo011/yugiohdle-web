"use client"
import { Card, Response } from "@/services/yugiohdle-api"
import { FormEvent, useState } from "react"
import { SelectCardInput } from "../select-card-input"
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
    const [responses, setResponses] = useState<Response[]>([])
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
        } else{
            console.log("ERROU NEWBIE")
        }
    }

    return (
        <>
            <form onSubmit={(onSubmit)} className="w-full">
                <SelectCardInput cards={cards} />
                <button type="submit">Submit</button>
                <ClassicResponses responses={responses} />
            </form>
        </>
    )
}