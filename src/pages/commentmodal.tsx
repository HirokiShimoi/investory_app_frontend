import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";


const CommentModal = ({isOpen, closeModal,selectedItem,selectcomments}) => {
    const [comment,setComment] = useState(selectcomments || "");
    
    useEffect(() => {
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
                    <Dialog open={isOpen} onClose={closeModal}>
            <DialogTitle>コメント</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    コメントを入力してください。
                </DialogContentText>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    キャンセル
                </Button>
                <Button onClick={handlesubmit} color="primary">
                    保存
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}


export default CommentModal