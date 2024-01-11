import { TextField, Button, Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Search() {
    const [storeNumber, setStoreNumber] = useState('');
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([])

    const handleStoreNumberChange = (e) => {
        setStoreNumber(e.target.value)
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
        if (keyword) {
            console.log(keyword)
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/?keyword=${keyword}`)
            .then(response => {
              console.log(response.data);
              setResults(response.data.results)
            })
            .catch(error => {
              console.log(error);
            });
        }
        if (storeNumber) {
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${storeNumber}/`)
            .then(response => {
              console.log(response.data);
              setResults(Array.isArray(response.data) ? response.data : [response.data]);
            })
            .catch(error => {
              console.log(error);
            });
        }
      };
    
    
    const toggleIsActive = (product_code,currentState) => {
        
        console.log("Toggling for ID:", product_code);
        console.log("Toggling for ID:", currentState);
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/products/is_active/${product_code}/`,{is_active: !currentState})
        .then(response => {
            setResults(results.map(item => {
                if (item.product_code === product_code) {
                    return {...item, is_active: !currentState};
                }   
                return item;
            }));

        })
        .catch(error => {
          console.log(error);
        });
    }
      

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
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Product Code</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Is Active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(results) && results.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{item.product_code}</TableCell>
                            <TableCell align="right">{item.category}</TableCell>
                            <TableCell align="right">{item.is_active ? 'Active' : 'Inactive'}<Button onClick={() => toggleIsActive(item.product_code, item.is_active)}>Toggle</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    )
}

export default Search