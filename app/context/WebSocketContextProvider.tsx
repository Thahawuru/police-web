"use client"
import React, {createContext, useState, useEffect, useRef} from 'react';
import { connectWebSocket, disconnectWebSocket } from '@/app/api/websocket';
import Toast from "@/app/components/utils/toaster";

export const WebSocketContext = createContext<any>(null);

interface WebSocketProviderProps {
    children: React.ReactNode;
}

const WebSocketContextProvider = ({ children }: WebSocketProviderProps) => {
    const [notifications, setNotifications] = useState([]);
    const notificationsRef = useRef(notifications);


    useEffect(() => {
        const handleNewMessage = (newMessage: any) => {
            // console.log('New WebSocket Message:', newMessage);
            // @ts-ignore
            notificationsRef.current = [...notificationsRef.current, newMessage]; // Update ref
            setNotifications([...notificationsRef.current]); // Update state
            // console.log('Updated Notifications:', notificationsRef.current);
        };

        connectWebSocket(handleNewMessage);

        return () => {
            disconnectWebSocket();
        };
    }, []);


    useEffect(() => {
        // console.log('notifi array', notifications);

        if (notifications.length > 0) {
            const lastNotification = notifications[notifications.length - 1];

            // @ts-ignore
            if (lastNotification.includes("failure")) {
                Toast({ type: "fail", message: lastNotification });
            } else { // @ts-ignore
                if (lastNotification.includes("success")) {
                                Toast({ type: "success", message: lastNotification });
                            } else {
                                Toast({ type: "info", message: lastNotification }); // Optional: handle other cases
                            }
            }
        } else {
            console.warn("Notifications array is empty.");
        }
    }, [notifications]);

    return (
        <WebSocketContext.Provider value={{ notifications }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketContextProvider;
