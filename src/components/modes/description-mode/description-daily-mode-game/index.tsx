"use client"
import { CacheResponses, Card, Response } from "@/services/yugiohdle-api"
import { FormEvent, useEffect, useState } from "react"
import { SelectCardInput } from "../../../select-card-input"
import { ListCardsButton } from "@/components/list/list-cards-button"
import { DescriptionResponses } from "../description-responses"
import { DescriptionCard } from "../description-card"
import { getCookie, setCookie } from "typescript-cookie"

type DescriptionDailyModeGameProps = {
    cards: Card[],
    dailyCard: Card
}

interface DescriptionDailyModeGameElements extends HTMLFormControlsCollection {
    cardInput: HTMLInputElement;
}
  
interface DescriptionDailyModeGameForm extends HTMLFormElement {
    readonly elements: DescriptionDailyModeGameElements;
}

export const DescriptionDailyModeGame = ({cards, dailyCard}: DescriptionDailyModeGameProps) => {
    const [filteredCards, setFilteredCards] = useState<Card[]>(cards)
    const [responses, setResponses] = useState<Response[]>([])
    const [winned, setWinned] = useState(false)
    
    const onSubmit = (
        e: FormEvent<DescriptionDailyModeGameForm>
        ) => {
        e.preventDefault()
        
        const cardId = e.currentTarget.elements.cardInput.value
        const chosenCard: Card = cards.find(card => card.id === cardId) as Card
        const response = {
            chosenCard: chosenCard, 
            correctCard: dailyCard
        }
        setResponses([...responses, response])
        setResponsesToday([...responses, response])
        if(cardId===dailyCard.id){
            console.log("ACERTOU MISERAVI")
            setWinnedToday()
        } else{
            console.log("ERROU NEWBIE")
        }
    }

    const verifyWinnedToday = () => {
        const winnedCache = getCookie('descriptionDailyWinned')
        if(!winnedCache){
            return false
        }
        const date = new Date().toLocaleDateString("pt-BR")
        const winned = winnedCache === `win-${date}` ? true : false
        return winned
    }

    const setWinnedToday = () => {
        const date = new Date().toLocaleDateString("pt-BR")
        setCookie('descriptionDailyWinned', `win-${date}`)
        setWinned(true)
    }
    
    const verifyResponsesToday = (): Response[] => {
        const date = new Date().toLocaleDateString("pt-BR")
        const responsesCache = getCookie('descriptionDailyResponses')
        if(!responsesCache){
            return []
        }
        const responsesJson: CacheResponses = JSON.parse(responsesCache)
        const responseCards = responsesJson.responses.map((responseId): Card => {
            return cards.find(card => card.id === responseId) as Card
        })
        const responsesFounded = responseCards.map((card): Response => {
            return {
                chosenCard: card,
                correctCard: dailyCard
            }
        })
        const responses: Response[] = responsesJson.date === `${date}` ? responsesFounded : []
        return responses
    }

    const setResponsesToday = (responses: Response[]) => {
        const date = new Date().toLocaleDateString("pt-BR")
        const responsesId = responses.map(response => response.chosenCard.id)
        const responsesToday: CacheResponses = {
            responses: responsesId,
            date
        }
        setCookie('descriptionDailyResponses', `${JSON.stringify(responsesToday)}`)
    }

    useEffect(()=>{
        const winned = verifyWinnedToday()
        if(winned) {
            setWinnedToday()
        }
        const responsesToday = verifyResponsesToday()
        setResponses(responsesToday)
    }, [])

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full">
                <ListCardsButton originalCards={cards} filteredCards={filteredCards} setFilteredCards={setFilteredCards} />
                <form onSubmit={(onSubmit)} className="w-full">
                    <div className="flex flex-col gap-y-4 my-10">
                        <DescriptionCard description={dailyCard.description} />
                        <SelectCardInput cards={cards} />
                        <button type="submit" disabled={winned}>Submit</button>
                    </div>
                    <DescriptionResponses responses={responses} />
                </form>
            </div>
        </>
    )
}