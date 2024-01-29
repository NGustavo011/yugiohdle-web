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
    const frameTypeOptions: Option[] = Array.from(new Set(originalCards.map(card => card.frameType))).map(frameType => ({
        value: frameType,
        label: frameType
    }));
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
                <ListCardsFilter originalCards={originalCards} setFilteredCards={setFilteredCards} frameTypeOptions={frameTypeOptions} />
                <ListCards filteredCards={filteredCards} />
            </Modal>
        </>
    )
}