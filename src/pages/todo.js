import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const TodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/todo/`, { text: todoText, due_date: dueDate });
      console.log("Submitted:", response.data);
    } catch (error) {
      console.error("There was an error submitting the todo", error);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <TextField
        label="Todo"
        variant="outlined"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <TextField
        label="Due Date"
        type="date"
        variant="outlined"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;
