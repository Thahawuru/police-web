import axios from 'axios';
const API_URL = "http://localhost:6000/api/v1";// Ensure this is the correct path to your config

// const TOKEN = process.env.TOKEN;
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOiJkN2JjOWFjMy1iYTc3LTQ1ZWQtYTBmMS1kYmUyNWM2NWJjY2YiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImV4cCI6MTcyMjg0MjEzOH0.vUWcDceJJnAYWRQRJQBGw2faDSAv2C0-hlGgzEK2kaI"
// console.log(TOKEN);

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  async (config) => {
    const token = TOKEN;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
