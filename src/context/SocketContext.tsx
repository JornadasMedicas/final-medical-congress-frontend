import { createContext } from "react";
import { PropsSocketContext } from "../interfaces/sockets/ISocket";
import { ReactNode } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext<PropsSocketContext>({ isOnline: false, socket: null });

export const SocketProvider = ({ children: Component }: { children: ReactNode }) => {
    // "undefined" means the URL will be computed from the `window.location` object
    const { socket, isOnline } = useSocket(`${import.meta.env.VITE_APP_URL_API_JORNADAS}`);

    return (
        <SocketContext value={{ socket, isOnline }}>
            {Component}
        </SocketContext>
    )
}