import { useState, useEffect } from 'react';
import axios from "axios";



function App() {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState('');

  useEffect(() => {
     axios.get('http://localhost:5000/tasks/all')
      .then((response) => {
        setTasks(response.data.data);
      })
    
  }, []);

  
  return (
    <div>
      <input value={add} onChange={(e) => setAdd(e.target.value)} />
      <button>Add</button>
      
 
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;