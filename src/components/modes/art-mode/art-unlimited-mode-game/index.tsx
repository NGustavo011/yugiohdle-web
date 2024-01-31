"use client"
import { Card, Response } from "@/services/yugiohdle-api"
import { FormEvent, useState } from "react"
import { SelectCardInput } from "../../../select-card-input"
import { ListCardsButton } from "@/components/list/list-cards-button"
// import { ArtResponses } from "../art-responses"
import Image from "next/image"
import { ArtResponses } from "../art-responses"

type ArtUnlimitedModeGameProps = {
    cards: Card[]
}

interface ArtUnlimitedModeGameElements extends HTMLFormControlsCollection {
    cardInput: HTMLInputElement;
}
  
interface ArtUnlimitedModeGameForm extends HTMLFormElement {
    readonly elements: ArtUnlimitedModeGameElements;
}

export const ArtUnlimitedModeGame = ({cards}: ArtUnlimitedModeGameProps) => {
    const [filteredCards, setFilteredCards] = useState<Card[]>(cards)
    const [cardsRandomOrder, setCardsRandomOrder] = useState<Card[]>([]);
    const [started, setStarted] = useState(false)
    const [resetOption, setResetOption] = useState(false)
    const [nextOption, setNextOption] = useState(false)
    const [winned, setWinned] = useState(false)
    const [responses, setResponses] = useState<Response[]>([])
    const [score, setScore] = useState(0)
    const maxLife = 5
    const [life, setLife] = useState(maxLife)
    const blurLevel = life === 5 ? "blur-2xl" : life === 4 ? "blur-xl" : life === 3 ? "blur-lg" : life === 2 ? "blur-md" : "blur"
    const [actualCard, setActualCard] = useState<Card | undefined>()
    console.log(actualCard)
    const onSubmit = (
        e: FormEvent<ArtUnlimitedModeGameForm>
        ) => {
        e.preventDefault()
        const cardId = e.currentTarget.elements.cardInput.value
        const chosenCard: Card = cards.find(card => card.id === cardId) as Card
        const response = {
            chosenCard: chosenCard, 
            correctCard: actualCard as Card
        }
        setResponses([...responses, response])
        if(cardId===actualCard?.id){
            correctAnswer()
        } else{
            wrongAnswer()
        }
    }

    const startNewRun = () => {
        setLife(maxLife)
        setScore(0)
        setResponses([])
        const cardsRandomOrderA = [...cards].sort( () => .5 - Math.random() )
        setActualCard(()=> cardsRandomOrderA.pop())
        setCardsRandomOrder(cardsRandomOrderA);
        setStarted(true)
        setResetOption(false)
        setWinned(false)
    }

    const callNextCard = () => {
        setLife(maxLife)
        setResponses([])
        setActualCard(()=> cardsRandomOrder.pop())
        setNextOption(false)
    }

    const wrongAnswer = () => {
        console.log("ERROU NEWBIE")
        if(life-1===0){
            loseGame()
        }
        setLife(life-1)
    }

    const correctAnswer = () => {
        console.log("ACERTOU MISERAVI")
        setScore(score+1)
        if(cardsRandomOrder.length) {
            setNextOption(true)
            return;
        }
        winGame()
    }

    const loseGame = () => {
        console.log("VOCÊ PERDEU")
        setStarted(false)
        setResetOption(true)
    }

    const winGame = () => {
        console.log("PARABÉNS VC PASSOU POR TODOS")
        setWinned(true)
        setStarted(false)
    }

    return (
        <>
            <div className="flex flex-col w-full">
                {
                    winned ? (
                        <>
                            <p>Winned</p>
                            <p>Play again?</p>
                        </>
                    ) : null
                }
                {
                    resetOption ? (
                        <>
                            <p>Game Over</p>
                        </>
                    ) : null
                }                
                
                {
                    started ? (
                    <>
                        <ListCardsButton originalCards={cards} filteredCards={filteredCards} setFilteredCards={setFilteredCards} />
                        <div>
                            <p>Score: {score}</p>
                            <p>Life: {life}</p>
                        </div>
                        <form onSubmit={(onSubmit)} >
                            <Image src={actualCard!.imageUrlCropped} alt={`${actualCard!.name} card`} width={300} height={300} className={`${blurLevel}`} />
                            <SelectCardInput cards={cards} />
                            <button type="submit" disabled={nextOption}>Submit</button>
                            <ArtResponses responses={responses} />
                        </form>
                    </>  
                    ) : (
                        <>
                            <button onClick={() => startNewRun()}>Start</button>
                        </>
                    )
                }
                {
                    nextOption===true ? (
                        <>
                            <button onClick={() => callNextCard()}>Next</button>
                        </>
                    ) : null
                }
                
            </div>
        </>
    )
}