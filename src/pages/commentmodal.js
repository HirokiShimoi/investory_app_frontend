import { useState } from "react";
import '../css/style.css';
import axios from "axios";


const CommentModal = ({isOpen, closeModal,selectedItem}) => {
    const [comment,setComment] = useState("");

    return(
        <>
            {isOpen?(
                <div className="modal">
                    <div className="modal-content">
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button onClick = {() => {}}>
                            保存
                        </button>
                        <button onClick={closeModal}>キャンセル</button>
                    </div>
                </div>
            ):null}
        </>
    );
}


export default CommentModal;