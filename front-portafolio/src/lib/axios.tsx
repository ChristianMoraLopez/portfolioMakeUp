import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        // Puedes agregar más headers si es necesario
    },
    withCredentials: true, // Para enviar cookies junto con las solicitudes
});

export default axios;
