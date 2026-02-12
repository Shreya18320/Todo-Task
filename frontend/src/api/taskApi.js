import axiosInstance from './axiosInstance';


export const getTasks = (filter) => {
  return filter === 'all'
    ? axiosInstance.get('/tasks/all')
    : axiosInstance.get(`/tasks/all/${filter}`);
};


export const createTask = (title) => {
  return axiosInstance.post('/tasks/create', { title });
};


export const updateTaskStatus = (id, status) => {
  return axiosInstance.put(`/tasks/update/${id}`, { status });
};
