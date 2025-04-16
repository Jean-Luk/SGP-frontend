import axios from 'axios';

const port = import.meta.env.VITE_PORT || 8080;
const host = import.meta.env.VITE_HOST || "localhost";

export const api = axios.create({
  baseURL: `http://${host}:${port}`
});
