import { Card } from "@/services/yugiohdle-api"
import { Dispatch, FormEvent, SetStateAction } from "react"
import { ListCardsFilterSelect } from "../list-cards-filter-select"

export type Option = {
    value: string
    label: string
}

type ListCardsFilterProps = {
    originalCards: Card[],
    setFilteredCards: Dispatch<SetStateAction<Card[]>>,
    frameTypeOptions: Option[]
}

interface ListCardsFilterElements extends HTMLFormControlsCollection {
    frameTypeInput: HTMLInputElement;
}

interface ListCardsFilterForm extends HTMLFormElement {
    readonly elements: ListCardsFilterElements;
}

export const ListCardsFilter = ({originalCards, setFilteredCards, frameTypeOptions}: ListCardsFilterProps) => {
    const onSubmit = (
        e: FormEvent<ListCardsFilterForm>
        ) => {
        e.preventDefault()
        const frameType = e.currentTarget.elements.frameTypeInput.value
        const frameTypeFilteredCards = originalCards.filter(card => card.frameType === frameType)
        setFilteredCards(frameTypeFilteredCards)
    }
    return (
        <>
            <div className="flex justify-center">
                <form onSubmit={(onSubmit)} >
                    <ListCardsFilterSelect id={"frameTypeInput"} title="Frame Type" options={frameTypeOptions} />
                    <button type="submit" className="bg-black p-2 rounded-md">Submit</button>
                </form>
            </div>
        </>
    )
}