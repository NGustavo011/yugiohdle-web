"use client"
import { Card, Response } from "@/services/yugiohdle-api"
import { FormEvent, useEffect, useState } from "react"
import { SelectCardInput } from "../../../select-card-input"
import { ListCardsButton } from "@/components/list/list-cards-button"
import { ClassicResponses } from "../classic-responses"
import { getCookie, setCookie } from 'typescript-cookie'

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

type CacheResponses = {
    responses: string[],
    date: string
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
        setResponsesToday([...responses, response])
        if(cardId===dailyCard.id){
            console.log("ACERTOU MISERAVI")
            setWinnedToday()
        } else{
            console.log("ERROU NEWBIE")
        }
    }

    const verifyWinnedToday = () => {
        const winnedCache = getCookie('classicDailyWinned')
        if(!winnedCache){
            return false
        }
        const date = new Date().toLocaleDateString("pt-BR")
        const winned = winnedCache === `win-${date}` ? true : false
        return winned
    }

    const setWinnedToday = () => {
        const date = new Date().toLocaleDateString("pt-BR")
        setCookie('classicDailyWinned', `win-${date}`)
        setWinned(true)
    }
    
    const verifyResponsesToday = (): Response[] => {
        const date = new Date().toLocaleDateString("pt-BR")
        const responsesCache = getCookie('classicDailyResponses')
        if(!responsesCache){
            return []
        }
        const responsesJson: CacheResponses = JSON.parse(responsesCache)
        console.log(responsesJson)
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
        setCookie('classicDailyResponses', `${JSON.stringify(responsesToday)}`)
    }

    useEffect(()=>{
        const winned = verifyWinnedToday()
        if(winned) {
            setWinnedToday()
        }
        const responsesToday = verifyResponsesToday()
        console.log(responsesToday)
        setResponses(responsesToday)
    }, [])

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