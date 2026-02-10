import { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Box, Stack, Checkbox, TextField, Paper } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (filter === 'all') {
      axios.get('http://localhost:5000/tasks/all')
        .then((res) => setTasks(res.data.data));
    } else {
      axios.get(`http://localhost:5000/tasks/${filter}`)
        .then((res) => setTasks(res.data.data));
    }    
        }, [filter]);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks/create', { title: add })
      .then((response) => {
        setTasks([...tasks, response.data.data]);
        setAdd('');
      });
  };

  const filtering = (task) => {
    axios.put(`http://localhost:5000/tasks/update/${task._id}`)
      .then(() => {
        if (filter === 'all') {
          axios.get('http://localhost:5000/tasks/all')
            .then((res) => setTasks(res.data.data));
        } else {
          axios.get(`http://localhost:5000/tasks/${filter}`)
            .then((res) => setTasks(res.data.data));
        }
      });
};

  return (
    <>
      <Box
        component="form"
        sx={{
          ':not(style)': {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }
        }}
        noValidate
        autoComplete="off">

        <TextField id="outlined-basic" label="Enter your Task" variant="outlined" value={add} onChange={(e) => setAdd(e.target.value)} sx={{ width: '60ch' }} />
        <Button variant="contained" onClick={addTask} sx={{ width: '20ch', p: 2 }}>Add</Button>

      </Box>

      <Stack spacing={20} direction="row" display={'flex'} justifyContent={'center'} width={'90%'} p={4}>
        <Button variant="text" onClick={() => setFilter('all')}>All</Button>
        <Button variant="contained" onClick={() => setFilter('completed')}>Completed</Button>
        <Button variant="outlined" onClick={() => setFilter('pending')}>Pending</Button>
      </Stack>

      {tasks.map(task => (
        <Paper
          key={task._id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: '10px 16px',
            marginBottom: 2,
            borderRadius: 2,
            width: '50%',
            mx: 'auto',
          }}
        >
          <Checkbox checked={task.status === 'completed'} onChange={() => filtering(task)} />
          {task.title}
        </Paper>
      ))}
    </>
  );
}

export default App;