import React,{ useState,useEffect } from "react";
import '../css/style.css';
import axios from "axios";

const CommentModal = ({isOpen, closeModal,selectedItem,selectcomments}) => {
    console.log("Received selectcomments: ", selectcomments); 
    const [comment,setComment] = useState(selectcomments || "");
    
    useEffect(() => {
        console.log("Received selectcomments: ", selectcomments);  
        setComment(selectcomments || "");
    },[selectcomments]);

    const handlesubmit = () => {
        console.log(selectedItem);
        axios.post('http://127.0.0.1:8000/api/comment/',{
            product:selectedItem,
            text: comment,
        })

        .then(response => {
            console.log('Comment saved:', response);
            closeModal();
        })
        .catch(error => {
            console.log('Save comment error:', error);
        });
    };

    return(
        <>
            {isOpen?(
                <div className="modal">
                    <div className="modal-content">
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button onClick = {handlesubmit}>
                            保存
                        </button>
                        <button onClick={closeModal}>キャンセル</button>
                    </div>
                </div>
            ):null}
        </>
    );
}


export default CommentModal