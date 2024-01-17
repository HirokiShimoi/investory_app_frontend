import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import useAuth from "../context/useauth";


function ReorderPointModal({ isOpen, closeModal,selectedItem }) {
    useAuth();
    const [newReorderPoint, setNewReorderPoint] = useState("");
    const handleSubmit = () => {

        axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/orderline/${selectedItem}/`,{
            reorder_point: newReorderPoint
        })
        .then(response => {
            window.alert('発注点が更新されました');
        })
        .catch(error => {
            window.alert('発注点が更新できませんでした');
        });

        closeModal();
    };

    return (

        <Modal open={isOpen} onClose={closeModal}>
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "white",
                border: "2px solid #000",
                boxShadow: 24,
                p: 2,
                textAlign: "center", // 要素を中央に配置
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>発注点を変更</Typography>
            <TextField
                label="新しい発注点"
                type="number"
                fullWidth
                value={newReorderPoint}
                onChange={(e) => setNewReorderPoint(e.target.value)}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>更新</Button>
                <Button variant="contained" color="grey" onClick={closeModal} sx={{ ml: 2 }}>閉じる</Button>
            </Box>

        </Box>
        </Modal>
    );
  }

  export default ReorderPointModal
