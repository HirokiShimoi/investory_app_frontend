import React from 'react'
import { useState } from 'react'

export const ReorderPointModal = ({ isOpen, closeModal,updateReorderPoint }) => {

    const [ newReorderPoint, setNewReorderPoint] = useState(null);

    const handleSubmit = () => {
        updateReorderPoint(newReorderPoint);
        closeModal();
    };
    return (
        <div>
            isOpen? (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>発注点を変更</h2>
                        <input type='number'/>
                    </div>
                </div>
            )
        </div>
    )
}

export default ReorderPointModal
