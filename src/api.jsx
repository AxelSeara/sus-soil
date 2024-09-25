// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tu-sitio-wordpress.com/wp-json/wp/v2/', // Cambia esto a la URL de tu WordPress
});

export default api;