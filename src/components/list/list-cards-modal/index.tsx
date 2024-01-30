import Modal from 'react-modal';
import { ListCards } from '../list-cards';
import { Card } from '@/services/yugiohdle-api';
import { IoClose } from 'react-icons/io5';
import { Dispatch, SetStateAction } from 'react';
import { ListCardsFilter, Option } from '../list-cards-filter';

type ListCardsModalProps = {
    modalIsOpen: boolean,
    closeModal: () => void,
    originalCards: Card[],
    filteredCards: Card[],
    setFilteredCards: Dispatch<SetStateAction<Card[]>>,
}

export const ListCardsModal = ({modalIsOpen, closeModal, originalCards, filteredCards, setFilteredCards}: ListCardsModalProps) => {
    const generateOptions = (attribute: keyof Card): Option[] => {
        const options: Option[] = Array.from(new Set(originalCards.map(card => card[attribute]))).map(value => {
            if(((attribute === "atk" || attribute === "def" || attribute === "level") && value===null ) || typeof value === "number"){
                return {
                    value: value ?? 0,
                    label: value ?? 0
                }
            }
            return {
                value: value ? value.toUpperCase() : "!na",
                label: value? value.toUpperCase() : "~N/A~"
            }
        }).sort((a, b) => {
            if(a.value < b.value) return -1
            if(a.value > b.value) return 1
            return 0
        })
        options.unshift({value: "!all", label: "~ALL~"})
        return options
    }

    const frameTypeOptions = generateOptions("frameType")
    const typeOptions = generateOptions("type")
    const levelOptions = generateOptions("level")
    const raceOptions = generateOptions("race")
    const attributeOptions = generateOptions("attribute")
    const archetypeOptions = generateOptions("archetype")
    
    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
              overlay: {
                backgroundColor: 'papayawhip',
                zIndex: 20
              },
            }}>
                <div className='flex justify-end mb-6'>
                    <IoClose onClick={closeModal} color="black" cursor="pointer" />
                </div>
                <ListCardsFilter originalCards={originalCards} setFilteredCards={setFilteredCards}
                    frameTypeOptions={frameTypeOptions}
                    typeOptions={typeOptions}
                    levelOptions={levelOptions}
                    raceOptions={raceOptions}
                    attributeOptions={attributeOptions}
                    archetypeOptions={archetypeOptions}
                />
                <ListCards filteredCards={filteredCards} />
            </Modal>
        </>
    )
}