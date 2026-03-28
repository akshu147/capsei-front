import { io } from "socket.io-client";

// ⚡️ Server ka URL
const SOCKET_URL = "http://localhost:4000"; // prod me apna domain

export const socket = io(SOCKET_URL, {
  autoConnect: false
});