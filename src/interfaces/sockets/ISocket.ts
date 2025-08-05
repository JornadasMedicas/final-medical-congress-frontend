import { Socket } from "socket.io-client";

export interface PropsSocketContext {
    socket: Socket | null;
    isOnline: boolean;
}