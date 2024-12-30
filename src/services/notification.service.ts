import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3010"; // Your NestJS backend URL

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("notification", (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => newSocket.close();
  }, []);

  return { socket, notifications };
};

export default useSocket;
