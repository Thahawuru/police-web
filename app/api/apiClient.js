import axios from 'axios';
const API_URL = "http://localhost:6000/api/v1";// Ensure this is the correct path to your config

// const TOKEN = process.env.TOKEN;
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOiI4NzdkOGQzOC04MDBjLTQ5MzctYjgzNC02MDI0OWViZDAwNjQiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImV4cCI6MTcyMjQzMDkxNn0.BjCszUfkOZntdW6WXoe1zUVjE40oXJGdVHTMMohoRlo"
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
