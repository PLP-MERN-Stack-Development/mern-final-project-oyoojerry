import { useEffect, useState } from 'react';
import API from '../api/api';
import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_API_URL);

export default function Dashboard(){
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    API.get('/tasks').then(res=> setTasks(res.data));
    socket.on('taskUpdated', updatedTask=>{
      setTasks(prev => prev.map(t=> t._id===updatedTask._id? updatedTask:t));
    });
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>{tasks.map(t=><li key={t._id}>{t.title} - {t.status}</li>)}</ul>
    </div>
  );
}
