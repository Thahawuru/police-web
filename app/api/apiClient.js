// apiClient.ts
import axios from 'axios';
// const TOKEN = process.env.TOKEN;
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOiI3Yjg0Njk2MS02ZGVkLTQ3YjYtOTNmZS1lMzFkNjU1MTVlYjYiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImV4cCI6MTczMTc0MzE5N30.qKpAsB1MRJpJgTdvjTNU4bOsMVBMB6NA1AGJBhQMmBk"

const API_URL = "http://localhost:8081/api/v1";


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add Authorization header if needed
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOiI4MjBmODFhYS1hODJjLTQyNDMtYjRhZS00NjgxYzE0NWFkY2QiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImV4cCI6MTczMjI3NDMxM30._oizmuRHe4cXc4xGaOXYKoo6jeLz6CaKwG5mgX7_Qrk'
  }
});

export default apiClient;
