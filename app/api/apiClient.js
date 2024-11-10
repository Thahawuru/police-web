// apiClient.ts
import axios from 'axios';
// const TOKEN = process.env.TOKEN;
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOiI3Yjg0Njk2MS02ZGVkLTQ3YjYtOTNmZS1lMzFkNjU1MTVlYjYiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImV4cCI6MTczMTIxNjg1MX0.rHUS3XdOdX48WUX80WOcGBT3xbPdUMXegQBuo86K3FE"

const API_URL = "http://localhost:8081/api/v1";


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add Authorization header if needed
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOiI3Yjg0Njk2MS02ZGVkLTQ3YjYtOTNmZS1lMzFkNjU1MTVlYjYiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImV4cCI6MTczMTIxNjg1MX0.rHUS3XdOdX48WUX80WOcGBT3xbPdUMXegQBuo86K3FE'
  }
});

export default apiClient;