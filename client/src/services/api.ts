// Imports
import axios from "axios";

// Setup API service
const api = axios.create({
  baseURL: import.meta.env.API_URL,
  timeout: 90000, // 90 seconds
  timeoutErrorMessage: 'The HTTPS request to the API timed out. This is likely due to poor internet connection.',
});

export default api;