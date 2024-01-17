import React, { useState,useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box,Grid,Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material';

import axios from 'axios';
import useAuth from '../context/useauth';

const TodoForm = () => {
    useAuth();
    const [todoText, setTodoText] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [todos,setTodos] = useState([]);
    const [openDialog,setOpenDialog] = useState(false);
    const [selectedId,setSelectedId] = useState('');
    const [errors,setErrors] = useState({
        todoText: '',
        dueDate: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);


const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
};

const handleCloseDialog = () => {
    setSelectedId(null);
    setOpenDialog(false);
};

const handleConfirmDelete = async () => {
    await handleDelete(selectedId);
    handleCloseDialog();
};


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/todo/`);
            setTodos(response.data);
        } catch (error) {
            setErrorMessage("データの取得に失敗しました")
        }
        };
        fetchData();
    },[]);

const handleSubmit = async () => {
    if (validate()) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/todo/`, { text: todoText, due_date: dueDate });
            const newTodo = response.data;
            console.log("Submitted:", response.data);
            setTodos(prevTodos => [...prevTodos, newTodo]);
    
        } catch (error) {
            setErrorMessage("データの取得に失敗しました")
        }
      };
    }

const handleDelete = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/todo/${id}/`);
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    catch (error) {
        setErrorMessage("データの取得に失敗しました")
    }
  };

  const validate = () => {
    let tempErrors = {};tempErrors.todoText = todoText ? "" : "Todo Text is required.";
    tempErrors.dueDate = dueDate ? "" : "Due Date is required.";
    
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  }

return (
    <>
        <Box sx={{ mt: 3, mb: 2 }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <TextField fullWidth label="Todo" variant="outlined" value={todoText} onChange={(e) => setTodoText(e.target.value)} error={Boolean(errors.todoText)} helperText={errors.todoText}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField fullWidth label="Due Date" type="date" variant="outlined" value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{shrink: true}}  error={Boolean(errors.dueDate)} helperText={errors.dueDate}/>
                    </Grid>                    
                    <Grid item xs={12} md={1}>
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            Add Todo
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
        <Typography variant="h4" component="h2" style={{ padding: '25px',textAlign: 'center' }}>
            TODOリスト
        </Typography>
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "75%" }}>Todo Text</TableCell>
                            <TableCell style={{ width: "8.33%" }}>Date</TableCell>
                            <TableCell style={{ width: "8.33%" }}>Due Date</TableCell>
                            <TableCell align="right" style={{ width: "8.33%" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell component="th" scope="row">
                                {todo.text}
                            </TableCell>
                            <TableCell>
                                {todo.created_at}
                            </TableCell>
                            <TableCell >
                                {todo.due_date}
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="secondary" onClick={() => handleOpenDialog(todo.id)}>
                                    完了
                                </Button>
                            </TableCell>
                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                                <DialogTitle>{"確認"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        本当にこのTODOを削除しますか？
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} color="primary">
                                        キャンセル
                                    </Button>
                                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                                        削除
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </TableRow>             
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </>
  );
};

export default TodoForm;
