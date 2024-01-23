"use client"
import { Card } from "@/services/yugiohdle-api"
import { Dispatch, FormEvent, FormEventHandler, SetStateAction, useEffect, useState } from "react"
import { SelectCardInput } from "../select-card-input"

type ClassicUnlimitedModeGameProps = {
    cards: Card[],
    cardsRandomOrder: Card[]
}

interface ClassicUnlimitedModeGameElements extends HTMLFormControlsCollection {
    cardInput: HTMLInputElement;
}
  
interface ClassicUnlimitedModeGameForm extends HTMLFormElement {
    readonly elements: ClassicUnlimitedModeGameElements;
}

const getActualCard = (cardsRandomOrder: Card[], setActualCard: Dispatch<SetStateAction<Card | undefined>>)=> {
    setActualCard(cardsRandomOrder.pop())
}

export const ClassicUnlimitedModeGame = ({cards, cardsRandomOrder}: ClassicUnlimitedModeGameProps) => {
    const [score, setScore] = useState(0)
    const maxLife = 5
    const [life, setLife] = useState(maxLife)
    const [actualCard, setActualCard] = useState<Card | undefined>( ()=> cardsRandomOrder.pop() )
    console.log(actualCard)
    const onSubmit = (
        e: FormEvent<ClassicUnlimitedModeGameForm>
        ) => {
        e.preventDefault()
        const cardId = e.currentTarget.elements.cardInput.value
        if(cardId===actualCard?.id){
            console.log("ACERTOU MISERAVI")
            setScore(score+1)
            setLife(maxLife)
            if(cardsRandomOrder.length) {
                setActualCard(cardsRandomOrder.pop())
                return;
            }
            console.log("PARABÉNS VC PASSOU POR TODOS")
        } else{
            console.log("ERROU NEWBIE")
            if(life-1===0){
                console.log("VOCÊ PERDEU")
            }
            setLife(life-1)
        }
    }

    return (
        <>
            <div>
                <p>Score: {score}</p>
                <p>Life: {life}</p>
            </div>
            <form onSubmit={(onSubmit)}>
                <SelectCardInput cards={cards} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}