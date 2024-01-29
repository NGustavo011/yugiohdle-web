import { Dispatch, SetStateAction, useState } from "react";
import { ListCardsModal } from "../list-cards-modal";
import { Card } from "@/services/yugiohdle-api";

type ListCardsButtonProps = {
    originalCards: Card[],
    filteredCards: Card[],
    setFilteredCards: Dispatch<SetStateAction<Card[]>>,
}

export const ListCardsButton = ({originalCards, filteredCards, setFilteredCards}: ListCardsButtonProps) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    return (
        <>
            <button onClick={openModal}>LIST</button>
            <ListCardsModal modalIsOpen={modalIsOpen} closeModal={closeModal} originalCards={originalCards} filteredCards={filteredCards} setFilteredCards={setFilteredCards} /> 
        </>
    )
}