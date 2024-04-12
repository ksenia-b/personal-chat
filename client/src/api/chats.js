import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_APP_SERVER_URL });
export const userChats = (userId) => API.get(`/${userId}`);
