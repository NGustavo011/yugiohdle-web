"use client"
import { Card } from "@/services/yugiohdle-api"
import { Dispatch, FormEvent, FormEventHandler, SetStateAction, useEffect, useState } from "react"
import { SelectCardInput } from "../select-card-input"

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
    const onSubmit = (
        e: FormEvent<ClassicDailyModeGameForm>
        ) => {
        e.preventDefault()
        const cardId = e.currentTarget.elements.cardInput.value
        if(cardId===dailyCard.id){
            console.log("ACERTOU MISERAVI")
        } else{
            console.log("ERROU NEWBIE")
        }
    }

    return (
        <>
            <form onSubmit={(onSubmit)}>
                <SelectCardInput cards={cards} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}