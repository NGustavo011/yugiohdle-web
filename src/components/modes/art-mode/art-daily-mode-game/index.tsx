"use client"
import { Card, Response } from "@/services/yugiohdle-api"
import { FormEvent, useState } from "react"
import { SelectCardInput } from "../../../select-card-input"
import { ListCardsButton } from "@/components/list/list-cards-button"
import { ArtResponses } from "../art-responses"
import Image from "next/image"

type ArtDailyModeGameProps = {
    cards: Card[],
    dailyCard: Card
}

interface ArtDailyModeGameElements extends HTMLFormControlsCollection {
    cardInput: HTMLInputElement;
}
  
interface ArtDailyModeGameForm extends HTMLFormElement {
    readonly elements: ArtDailyModeGameElements;
}

export const ArtDailyModeGame = ({cards, dailyCard}: ArtDailyModeGameProps) => {
    const [filteredCards, setFilteredCards] = useState<Card[]>(cards)
    const [responses, setResponses] = useState<Response[]>([])
    const [attempts, setAttempts] = useState(0)
    const blurLevel = attempts >= 0 && attempts < 3 ? "blur-2xl" : attempts >= 3 && attempts < 5 ? "blur-xl" : attempts >= 5 && attempts < 10 ? "blur-lg" : attempts >= 10 && attempts < 15  ? "blur-md" : "blur"
    const [winned, setWinned] = useState(false)
    const onSubmit = (
        e: FormEvent<ArtDailyModeGameForm>
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
        setAttempts(attempts+1)
    }

    return (
        <>
            <form onSubmit={(onSubmit)} className="w-full">
                <ListCardsButton originalCards={cards} filteredCards={filteredCards} setFilteredCards={setFilteredCards} />
                <div className="flex flex-col gap-y-4 my-10">
                    <Image src={dailyCard!.imageUrlCropped} alt={`${dailyCard!.name} card`} width={300} height={300} className={`${blurLevel}`} />
                    <SelectCardInput cards={cards} />
                    <button type="submit" disabled={winned}>Submit</button>
                </div>
                <ArtResponses responses={responses} />
            </form>
        </>
    )
}