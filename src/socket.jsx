import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const GetSocket = ()=> useContext(SocketContext)

const SocketProvider = ({ children }) => {
  const socket = useMemo(()=>io("https://chattingkaro-s.onrender.com", { withCredentials: true }),[])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );

};

export{GetSocket,SocketProvider}