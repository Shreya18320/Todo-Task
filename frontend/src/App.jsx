// import { task } from 'ember-concurrency';
// import { useState, useEffect } from 'react';
// import axios from "axios";
// import { Button, Box, Stack, Checkbox, TextField, Paper,Typography } from '@mui/material';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [add, setAdd] = useState('');
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     if (filter === 'all') {
//       axios.get('http://localhost:5000/tasks/all')
//         .then((res) => setTasks(res.data.data));
//     } else {
//       axios.get(`http://localhost:5000/tasks/all/${filter}`)
//         .then((res) => setTasks(res.data.data));
//     }    
//         }, [filter]);

//   const addTask = () => {
//     axios.post('http://localhost:5000/tasks/create', { title: add })
//       .then((response) => {
//         setTasks([...tasks, response.data.data]);
//         setAdd('');
//       });
//   };

//   const filtering = (task) => {
//     axios.put(`http://localhost:5000/tasks/update/${task._id}`,{status: task.status })
//       .then(() => {
         
//         if (filter === 'all') {
//           axios.get('http://localhost:5000/tasks/all')
//             .then((res) => setTasks(res.data.data));
//         } else {
//           axios.get(`http://localhost:5000/tasks/all/${filter}`)
//             .then((res) => setTasks(res.data.data));
//         }
//       });
// };

//   return (
//     <>
//     <Typography variant="h1" sx={{ color: 'white', fontSize: '2rem', backgroundColor: 'primary.main', width:'50%'}}>
//   Todo-List
// </Typography>
//       <Box
//         component="form"
//         sx={{
//           ':not(style)': {
//             width: '100%',
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: 1
//           }
//         }}
//         noValidate
//         autoComplete="off">

//         <TextField id="outlined-basic" label="Enter your Task" variant="outlined" value={add} onChange={(e) => setAdd(e.target.value)} sx={{ width: '60ch' }} />
//         <Button variant="contained" onClick={addTask} sx={{ width: '20ch', p: 2 }}>Add</Button>

//       </Box>

//       <Stack spacing={20} direction="row" display={'flex'} justifyContent={'center'} width={'90%'} p={4}>
//         <Button variant="text" onClick={() => setFilter('all')}>All</Button>
//         <Button variant="contained" onClick={() => setFilter('completed')}>Completed</Button>
//         <Button variant="outlined" onClick={() => setFilter('pending')}>Pending</Button>
//       </Stack>

//       {tasks.map(task => (
//         <Paper
//           key={task._id}
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             p: '10px 16px',
//             marginBottom: 2,
//             borderRadius: 2,
//             width: '50%',
//             mx: 'auto',
//           }}
//         >
//           <Checkbox checked={task.status === 'completed'} onChange={() => filtering(task)} />
//           {task.title}
//         </Paper>
//       ))}
//     </>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react'
import {
  getTasks,
  createTask,
  updateTaskStatus,
} from './api/taskApi';

import { Container, 
  TextField, 
  Typography, 
  Box, 
  Button, 
  Stack,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip ,
  


} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';



const App = () => {

 const [tasks, setTasks] = useState([]);
 const [add, setAdd] = useState('');
 const [filter,setFilter]=useState('all');
  

  useEffect(() => {
   fetchTask();
        }, [filter]);

        const fetchTask= async ()=>{

         try {
    const res = await getTasks(filter);
    setTasks(res.data.data);
  } catch (error) {
    console.error(error);
  }

        }

  const addTask = async () => {
    try {
    if (!add.trim()) {
      alert('Please enter your task!');
      return;
    }

    const res = await createTask(add);
    setTasks([...tasks, res.data.data]);
    setAdd('');
  } catch (error) {
    console.error(error);
  }
}

  

const filtering = async (task) =>{
  try {
    await updateTaskStatus(task._id, task.status);
    fetchTask();
  } catch (error) {
    console.error(error);
  }
}

  return (
    <>
      <Container 
  maxWidth={false} 
  sx={{
    maxWidth: '1440px',
    mx: 'auto',
    p:3,
    bgcolor: "#fff5f0"
  }}
>
        <Typography variant="h1" sx={{
          fontSize:'50px',
          textAlign:'center',
          fontWeight:500,
          bgcolor:'#ffffff',
          p:1
          
        }}>
          Todo-List
        </Typography>

<Box
sx={{
  bgcolor:"#ffffff",
  p:3,
  mt:3
}}>
        <Stack direction="row" spacing={2} justifyContent={'center'} 
        sx={{
         
         
          '& .MuiOutlinedInput-root': {
                  bgcolor: '#fafafa',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                  '&.Mui-focused': {
                    bgcolor: 'white',
                  },
                },
        }}>
          <TextField placeholder='Enter your Task' value={add} onChange={(e) => setAdd(e.target.value)} 
          sx={{
           width:'100%',
            
          }}/>
          <Button variant="contained" onClick={addTask}
         sx={{
                bgcolor: '#ff8a65',
                px: 4,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#ff7043',
                  boxShadow: 'none',
                },
              }}>Add</Button>
          
        </Stack>
</Box>

{/* search */}

<Box
sx={{
  bgcolor:"#ffffff",
  p:3,
  mt:3
}}>
        
          <Stack direction="row" spacing={2} justifyContent={'space-between'} >
          <TextField placeholder='Search Task'  
          sx={{
           width:'50%',
            '& .MuiOutlinedInput-root': {
                  bgcolor: '#fafafa',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                  '&.Mui-focused': {
                    bgcolor: 'white',
                  },
                },
          }}/>

<Tabs
              value={filter === 'all' ? 0 : filter === 'completed' ? 1 : 2}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  minWidth: 100,
                  '&.Mui-selected': {
                    color: '#ff8a65',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ff8a65',
                  height: 3,
                },
              }}
            >
              <Tab label="All" onClick={() => setFilter('all')} />
              <Tab label="Completed" onClick={() => setFilter('completed')} />
              <Tab label="Pending" onClick={() => setFilter('pending')} />
            </Tabs>
          </Stack>
        </Box>
          

          {/* table */}

           <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
         
          <TableHead>
            <TableRow sx={{ bgcolor: '#fafafa' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Task
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          
          <TableBody>
             {tasks.length === 0  ? (
            <TableRow hover>
              <TableCell colSpan={2} align="center" sx={{ py: 8 }}>
                <Typography color="text.secondary">
          No tasks yet...
           </Typography>
              </TableCell>
</TableRow>
) : (
    tasks.map((task) => (
      <TableRow hover key={task._id}>
              <TableCell sx={{
          color: task.status === 'completed' ? '#999' : '#2c3e50',
          textDecoration: task.status === 'completed' ? 'line-through' : 'none',}}>
            {task.title}
        </TableCell>
        <TableCell align="right">
                <Chip
            icon={task.status === 'completed' ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            label={task.status === 'completed' ? 'Completed' : 'Pending'}
            onClick={() => filtering(task)}
            sx={{
              bgcolor: task.status === 'completed' ? '#e8f5e9' : '#fff3e0',
              color: task.status === 'completed' ? '#2e7d32' : '#e65100',
              fontWeight: 500,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: task.status === 'completed' ? '#c8e6c9' : '#ffe0b2',
              },
            }}
          />
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>
        </Table>
      </TableContainer>
    </Paper>
        
       </Container>
   </>
  )
}

export default App
