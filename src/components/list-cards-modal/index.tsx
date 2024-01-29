import Modal from 'react-modal';
import { ListCards } from '../list-cards';
import { Card } from '@/services/yugiohdle-api';
import { IoClose } from 'react-icons/io5';

type ListCardsModalProps = {
    modalIsOpen: boolean,
    closeModal: () => void,
    cards: Card[]
}

export const ListCardsModal = ({modalIsOpen, closeModal, cards}: ListCardsModalProps) => {
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
                <ListCards cards={cards} />
            </Modal>
        </>
    )
}