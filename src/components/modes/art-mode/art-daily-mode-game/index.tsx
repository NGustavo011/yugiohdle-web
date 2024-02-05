"use client"
import { CacheResponses, Card, Response } from "@/services/yugiohdle-api"
import { FormEvent, useEffect, useState } from "react"
import { SelectCardInput } from "../../../select-card-input"
import { ListCardsButton } from "@/components/list/list-cards-button"
import { ArtResponses } from "../art-responses"
import Image from "next/image"
import { getCookie, setCookie } from "typescript-cookie"

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
    const [winned, setWinned] = useState(false)
    const blurLevel = winned ? "" : (attempts >= 0 && attempts < 3 ? "blur-2xl" : attempts >= 3 && attempts < 5 ? "blur-xl" : attempts >= 5 && attempts < 10 ? "blur-lg" : attempts >= 10 && attempts < 15  ? "blur-md" : "blur")
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
        setResponsesToday([...responses, response])
        if(cardId===dailyCard.id){
            console.log("ACERTOU MISERAVI")
            setWinnedToday()
        } else{
            console.log("ERROU NEWBIE")
        }
        setAttempts(attempts+1)
    }

    const verifyWinnedToday = () => {
        const winnedCache = getCookie('artDailyWinned')
        if(!winnedCache){
            return false
        }
        const date = new Date().toLocaleDateString("pt-BR")
        const winned = winnedCache === `win-${date}` ? true : false
        return winned
    }

    const setWinnedToday = () => {
        const date = new Date().toLocaleDateString("pt-BR")
        setCookie('artDailyWinned', `win-${date}`)
        setWinned(true)
    }
    
    const verifyResponsesToday = (): Response[] => {
        const date = new Date().toLocaleDateString("pt-BR")
        const responsesCache = getCookie('artDailyResponses')
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
        setCookie('artDailyResponses', `${JSON.stringify(responsesToday)}`)
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
                    <div className="flex flex-col gap-y-4 my-10">
                        <Image src={dailyCard!.imageUrlCropped} alt={`${dailyCard!.name} card`} width={300} height={300} className={`${blurLevel}`} />
                        <SelectCardInput cards={cards} />
                        <button type="submit" disabled={winned}>Submit</button>
                    </div>
                    <ArtResponses responses={responses} />
                </form>
            </div>
        </>
    )
}