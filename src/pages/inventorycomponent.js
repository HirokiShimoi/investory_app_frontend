import React from 'react'
import { useState } from 'react'

function InventoryComponent() {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    };

      
    return (
        <div>
            {/* Inventory のデータ表示など */}
            <button onClick={() => openModal(/* 選択された商品情報 */)}>発注点を変更</button>
            <ReorderPointModal
              isOpen={modalIsOpen}
              closeModal={closeModal}
            />
        </div>
    )
}

export default InventoryComponent