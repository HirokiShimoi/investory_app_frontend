import React from "react";
import { useState } from "react";
import '../css/style.css';
import axios from "axios";

function ReorderPointModal({ isOpen, closeModal,selectedItem }) {
    const [newReorderPoint, setNewReorderPoint] = useState("");
  
    const handleSubmit = () => {

        axios.patch(`http://127.0.0.1:8000/api/orderline/${selectedItem}/`,{
            reorder_point: newReorderPoint
        })
        .then(response => {
            console.log('success',response.data)
        })
        .catch(error => {
            console.log('ERROR',error)
        });

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
