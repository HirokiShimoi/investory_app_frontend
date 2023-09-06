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

    const updateReorderPoint = (newReorderPoint) => {
        // ここでAPIを呼び出して発注点を更新
        console.log(`新しい発注点: ${newReorderPoint} for 商品: ${selectedItem.product_name}`);
      };

      
    return (
        <div>
            {/* Inventory のデータ表示など */}
            <button onClick={() => openModal(/* 選択された商品情報 */)}>発注点を変更</button>
            <ReorderPointModal
              isOpen={modalIsOpen}
              closeModal={closeModal}
              updateReorderPoint={updateReorderPoint}
            />
        </div>
    )
}

export default InventoryComponent