// socket.js
import { io } from "socket.io-client";

const apiUrl = process.env.API_HOST;

// Configuración del socket
const socket = io(`${apiUrl}`, {
    secure: true, // Asegura la conexión HTTPS
    reconnection: true, // Permite reconexión automática
});


export default socket;
