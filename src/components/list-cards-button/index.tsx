import { useState } from "react";
import { ListCardsModal } from "../list-cards-modal";
import { Card } from "@/services/yugiohdle-api";

type ListCardsButtonProps = {
    cards: Card[]
}

export const ListCardsButton = ({cards}: ListCardsButtonProps) => {
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
            <ListCardsModal modalIsOpen={modalIsOpen} closeModal={closeModal} cards={cards} /> 
        </>
    )
}