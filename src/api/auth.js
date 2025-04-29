// import axios from 'axios'

// const API_URL = 'https://django-rest-gelftech-72c0353ffa99.herokuapp.com/api/auth'

// export const login = async (credentials) => {
//   try {
//     const response = await axios.post(`${API_URL}/login/`, credentials)
//     return response.data
//   } catch (error) {
//     throw error.response?.data || error.message
//   }
// }

// export default {
//   login
// }

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || { message: error.message };
    throw new Error(
      errorData.message || 'Error en la autenticación', 
      { cause: errorData }
    );
  }
};

export const authService = {
  login
};

export default authService;