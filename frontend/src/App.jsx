import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTaskStatus } from './api/taskApi';
import { 
  Container, 
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
  Chip,
  TablePagination
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);
  const [totalRecords, setTotalRecords] = useState(0);




  
  const fetchTask = async () => {
    try {
      const res = await getTasks(filter, searchQuery,  page, rowsPerPage);
      setTasks(res.data.data.tasks);
      setTotalRecords(res.data.data.totalRecords);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTask(); 
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filter, searchQuery, page, rowsPerPage]);

  const addTask = async () => {
    try {
      if (!add.trim()) {
        alert('Please enter your task!');
        return;
      }
      
      const res = await createTask(add);
      setTasks([res.data.data, ...tasks]);
      setAdd('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  const filtering = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      
      await updateTaskStatus(task._id, newStatus);
      
      if (filter === 'all') {
        setTasks(tasks.map(t => 
          t._id === task._id ? { ...t, status: newStatus } : t
        ));
      } else {
        setTasks(tasks.filter(t => t._id !== task._id));
      }
      
    } catch (error) {
      console.error('Error updating task:', error);
      fetchTask();
    }
  }

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', p: 3, bgcolor: "#fff5f0" }}>
      
      <Typography variant="h1" sx={{ fontSize: '50px', textAlign: 'center', fontWeight: 500, bgcolor: '#ffffff', p: 1 }}>
        Todo-List
      </Typography>

      <Box sx={{ bgcolor: "#ffffff", p: 3, mt: 3 }}>
        <Stack direction="row" spacing={2} justifyContent={'center'}>
          <TextField 
            placeholder='Enter your Task' 
            value={add} 
            onChange={(e) => setAdd(e.target.value)}
            sx={{  width: '100%',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#cfb2a9',
        borderWidth: '2px',
      },
      },}}
          />
          <Button 
            variant="contained" 
            onClick={addTask}
            sx={{ bgcolor: '#ff8a65', px: 4, '&:hover': { bgcolor: '#ff7043' } }}
          >
            Add
          </Button>
        </Stack>
      </Box>

      <Box sx={{ bgcolor: "#ffffff", p: 3, mt: 3 }}>
        <Stack direction="row" spacing={2} justifyContent={'space-between'}>
          
          <TextField 
            placeholder='Search tasks...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: '50%',
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fafafa',
                '&:hover': { bgcolor: '#f5f5f5' },
                '&.Mui-focused': { bgcolor: 'white' },
              },
            }}
          />

          <Tabs
            value={filter === 'all' ? 0 : filter === 'completed' ? 1 : 2}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                '&.Mui-selected': { color: '#ff8a65' },
              },
              '& .MuiTabs-indicator': { backgroundColor: '#ff8a65', height: 3 },
            }}
          >
            <Tab label="All" onClick={() => setFilter('all')} />
            <Tab label="Completed" onClick={() => setFilter('completed')} />
            <Tab label="Pending" onClick={() => setFilter('pending')} />
          </Tabs>
        </Stack>
      </Box>

      <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fafafa' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>Task</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, fontSize: '1rem' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">
                      {searchQuery ? 'No matching tasks found...' : 'No tasks yet...'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
                  <TableRow hover key={task._id}>
                    <TableCell sx={{
                      color: task.status === 'completed' ? '#999' : '#2c3e50',
                      textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                    }}>
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

        <TablePagination
  component="div"
  count={totalRecords}
  page={page}
  onPageChange={(e, newPage) => setPage(newPage)}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={(e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0); 
  }}
  rowsPerPageOptions={[10, 25, 50, 100]}
/>
      </Paper>
    </Container>
  )
}

export default App;