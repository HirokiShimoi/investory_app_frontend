import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import React, { useState,useEffect } from 'react';

function Search() {
    const [storeNumber, setStoreNumber] = useState('');
    const [keyword, setKeyword] = useState('');

    const handleStoreNumberChange = (e) => {
        setStoreNumber(e.target.value)
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
        console.log(`Searching with store number: ${storeNumber}, keyword: ${keyword}`);
        // API call or other actions here
      };

    return (
        <Container>
            <Typography varient="h4" gutterBottom>
                search
            </Typography>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField fullwidth label="インストアで検索" variant="outlined" value={storeNumber} onChange={handleStoreNumberChange}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="フリーワード検索" variant="outlined" value={keyword} onChange={handleKeywordChange}/>
                    </Grid> 
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSearch}>
                         検索
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Search