import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
