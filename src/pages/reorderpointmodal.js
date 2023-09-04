<<<<<<< HEAD
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
=======
import React from "react";
import { useState } from "react";
import '../css/style.css';
import axios from "axios";

function ReorderPointModal({ isOpen, closeModal, updateReorderPoint,selectedItem }) {
    const [newReorderPoint, setNewReorderPoint] = useState("");
  
    const handleSubmit = () => {

        axios.put(`http://127.0.0.1:8000/api/inventory/update/${selectedItem.product_code}/`,{
            reorder_point: newReorderPoint
        })
        .then(response => {
            console.log('success',response.data)
        })
        .catch(error => {
            console.log('ERROR',error)
        });

        updateReorderPoint(newReorderPoint);
        closeModal();
    };

    return (
      isOpen ? (
        <div className='modal'>
            <div className='modal-content'>
                <h2>発注点を変更</h2>
                <input
                    type='number'
                    placeholder='新しい発注点'
                    value={newReorderPoint}
                    onChange={(e) => setNewReorderPoint(e.target.value)}
                />
                <button onClick={handleSubmit}>更新</button>
                <button onClick={closeModal}>閉じる</button>
            </div>
        </div>
      ) : null
    );
  }

  export default ReorderPointModal
>>>>>>> 8ff66d6b3a8c22d115482398392661ea9896e6f6
