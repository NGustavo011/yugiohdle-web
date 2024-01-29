import { Card } from "@/services/yugiohdle-api"
import { Dispatch, FormEvent, SetStateAction } from "react"
import { ListCardsFilterSelect } from "../list-cards-filter-select"

export type Option = {
    value: string | number
    label: string | number
}

type ListCardsFilterProps = {
    originalCards: Card[],
    setFilteredCards: Dispatch<SetStateAction<Card[]>>,
    frameTypeOptions: Option[],
    typeOptions: Option[],
    levelOptions: Option[],
    raceOptions: Option[],
    attributeOptions: Option[],
    archetypeOptions: Option[]
}

type ListCardsFilterElementsInputs = "frameTypeInput" | "typeInput" | "levelInput" | "raceInput" | "attributeInput" | "archetypeInput"

interface ListCardsFilterElements extends HTMLFormControlsCollection {
    frameTypeInput: HTMLInputElement;
    typeInput: HTMLInputElement;
    levelInput: HTMLInputElement;
    raceInput: HTMLInputElement;
    attributeInput: HTMLInputElement;
    archetypeInput: HTMLInputElement;
}

interface ListCardsFilterForm extends HTMLFormElement {
    readonly elements: ListCardsFilterElements;
}

export const ListCardsFilter = ({originalCards, setFilteredCards, 
    frameTypeOptions, typeOptions, levelOptions, raceOptions, attributeOptions, archetypeOptions
    }: ListCardsFilterProps) => {

    const applyFilter = (e: FormEvent<ListCardsFilterForm>, filterInput: ListCardsFilterElementsInputs, filteredCards: Card[], field: keyof Card) => {
        const filter = e.currentTarget.elements[filterInput].value
        console.log(filteredCards)
        filteredCards = filter==="!all"? filteredCards : filter==="!na" || filter==="0" ? filteredCards.filter(card => card[field] === null) : filteredCards.filter(card => card[field]?.toString().toUpperCase() === filter)
        return filteredCards
    }

    const onSubmit = (
        e: FormEvent<ListCardsFilterForm>
        ) => {
        e.preventDefault()
        let filteredCards = originalCards
        filteredCards = applyFilter(e, "frameTypeInput", filteredCards, "frameType")
        filteredCards = applyFilter(e, "typeInput", filteredCards, "type")
        filteredCards = applyFilter(e, "levelInput", filteredCards, "level")
        filteredCards = applyFilter(e, "raceInput", filteredCards, "race")
        filteredCards = applyFilter(e, "attributeInput", filteredCards, "attribute")
        filteredCards = applyFilter(e, "archetypeInput", filteredCards, "archetype")
        setFilteredCards(filteredCards)
    }

    const clearFilter = () => {
        setFilteredCards(originalCards)
    }

    return (
        <>
            <div className="flex justify-center">
                <form onSubmit={(onSubmit)} onReset={clearFilter}>
                    <div className="flex flex-col gap-4 my-8">
                        <div className="flex gap-8">
                            <ListCardsFilterSelect id={"frameTypeInput"} title="Frame Type" options={frameTypeOptions} />
                            <ListCardsFilterSelect id={"typeInput"} title="Type" options={typeOptions} />
                            <ListCardsFilterSelect id={"levelInput"} title="Level" options={levelOptions} />
                            <ListCardsFilterSelect id={"raceInput"} title="Race" options={raceOptions} />
                            <ListCardsFilterSelect id={"attributeInput"} title="Attribute" options={attributeOptions} />
                            <ListCardsFilterSelect id={"archetypeInput"} title="Archetype" options={archetypeOptions} />
                        </div>
                        <div className="flex gap-4">
                            <button type="reset" className="bg-red-500 p-2 rounded-md w-3/12">Clear</button>
                            <button type="submit" className="bg-black p-2 rounded-md w-9/12">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}