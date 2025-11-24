import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api', // URL Backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Trước khi gửi request, tự động lấy token trong máy gắn vào
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;