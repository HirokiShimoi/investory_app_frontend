import React,{useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

function InventoryUpdate() {
    const [file, setFile] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('file',file)

        axios.put('http://127.0.0.1:8000/api/update_inventory/', formData)
            .then(response => {
                console.log('File uploaded:', response);
            })
            .catch(error => {
                console.log('Update failed', error);
            });
    };

    return (
        <div>
            <Input type='file' onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Upload
            </Button>
        </div>
    )
}

export default InventoryUpdate