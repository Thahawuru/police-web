// apiClient.ts
import axios from 'axios';
// const TOKEN = process.env.TOKEN;
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOiJkN2JjOWFjMy1iYTc3LTQ1ZWQtYTBmMS1kYmUyNWM2NWJjY2YiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImV4cCI6MTcyMjg0MjEzOH0.vUWcDceJJnAYWRQRJQBGw2faDSAv2C0-hlGgzEK2kaI"

const API_URL = "http://localhost:6000/api/v1";


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add Authorization header if needed
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOiI4NzdkOGQzOC04MDBjLTQ5MzctYjgzNC02MDI0OWViZDAwNjQiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImV4cCI6MTcyMjQzMDkxNn0.BjCszUfkOZntdW6WXoe1zUVjE40oXJGdVHTMMohoRlo'
  }
});

export default apiClient;