import socketio from "socket.io-client";
import { createContext } from "react";
const SOCKET_URL = "http://localhost:5000"; //use config or env variable

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext({})

    // const socket = socketio("http://localhost:5000");
    // socket.on("connect", () => {
    //   socket.sendBuffer = [];
    //   console.log(socket.connected); // true
    // });

    // socket.on("connect_error", () => {
    //   setTimeout(() => {
    //     socket.connect();
    //   }, 1000);
    // });


