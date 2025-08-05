import { useEffect, useMemo, useState } from "react"
import { io } from 'socket.io-client';

export const useSocket = (url: string | undefined) => {
    const socket = useMemo(() => io(url, { autoConnect: false, transports: ['websocket'] }), [url]);
    const [isOnline, setIsOnline] = useState<boolean>(false);

    useEffect(() => {//connect socket when component is rendered and disconnects when is unmounted only if has to be used in specific component of the application. If the socket is needed in all the app remove cleanup function
        socket.connect();

        return () => {
            socket.disconnect();
        }
    }, [socket]);

    useEffect(() => {
        const connect = () => {
            setIsOnline(true);
        }

        socket.on('connect', connect);

        return () => { //turn off listener
            socket.off('connect', connect);
        }
    }, [socket]);

    useEffect(() => {
        const disconnect = () => {
            setIsOnline(false);
        }

        socket.on('disconnect', disconnect);

        return () => {
            socket.off('disconnect', disconnect);
        }
    }, [socket]);

    return {
        isOnline,
        socket
    }
}