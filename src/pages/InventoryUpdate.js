import React,{useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';

function InventoryUpdate() {
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState(null);
    const [errormessage,setErrorMessage] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && !selectedFile.name.endsWith('.csv')) {
            setErrorMessage('CSV形式のファイルを使用してください');
            return;
        }
    
        setFile(selectedFile);
        setErrorMessage(null); // エラーメッセージをクリア
    }

    const handleUpdate = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file',file)

        axios.put('http://127.0.0.1:8000/api/update_inventory/', formData)
            .then(response => {
                setLoading(false);
                setMessage("在庫データのアップロードに成功しました")
                console.log('File uploaded:', response);
            })
            .catch(error => {
                setLoading(false);
                setErrorMessage("在庫データのアップロードに失敗しました");
                console.log('Update failed', error);
            });
    };
    

    return (
        <div style={{ padding: '20px', textAlign: 'center'}}>
            <Typography variant="h5" component="h2" style={{ marginBottom: '16px' }}>
                ※弥生販売のZaikoichi.csvを使用してください。
            </Typography>

            <Grid container spacing={2}  justifyContent="center" >
                <Grid item>
                    <FormControl variant="outlined">
                        <Input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <Box ml={3}>
                        <Button variant="contained" color="primary" onClick={handleUpdate} disabled={!file || loading}>
                            Upload
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            { loading && <CircularProgress/>}
            { message && <div style={{ margin:'16px' }}>{message}</div>}
            { errormessage && <div style={{ margin:'16px', color: 'red' }}>{errormessage}</div>}
        </div>
    )
}

export default InventoryUpdate