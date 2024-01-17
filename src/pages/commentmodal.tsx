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
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    
    useEffect(() => {
        setComment("");
        setSuccessMessage('');
        setErrorMessage('');
    },[selectcomments]);

    useEffect(() => {if (isOpen) {
        // モーダルが開かれた時、コメントをリセット
        setComment(selectcomments || "");
        // エラーメッセージと成功メッセージもリセット
        setErrorMessage('');
        setSuccessMessage('');
        }
        }, [isOpen, selectcomments]);


    const handlesubmit = () => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/comment/`,{
            product:selectedItem,
            text: comment,
        })

        .then(response => {
            setSuccessMessage('コメントが正常に保存されました！');
            closeModal();
        })
        .catch(error => {
            setErrorMessage('コメントの保存に失敗しました。');
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