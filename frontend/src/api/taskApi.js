import axiosInstance from './axiosInstance';

export const getTasks = (filter = 'all', searchQuery = '',  page = 0, limit = 10) => {
  const params = {page, limit};

  if (filter && filter !== 'all') {
    params.status = filter;
  }

  if (searchQuery && searchQuery.trim() !== '') {
    params.search = searchQuery.trim();
  }

  return axiosInstance.get('/tasks/all', { params });
};

export const createTask = (title) => {
  return axiosInstance.post('/tasks/create', { title });
};

export const updateTaskStatus = (id, status) => {
  return axiosInstance.put(`/tasks/update/${id}`, { status });
};