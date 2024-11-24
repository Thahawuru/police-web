import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient;
export function connectWebSocket(onMessageReceived) {
    const socket = new SockJS('http://localhost:8081/ws');  

     stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (str) => console.log(str),
        
        onConnect: (frame) => {
            console.log('WebSocket Connected:', frame);
            
            stompClient.subscribe('/topic/notifications', (message) => {
                console.log('Notification received:', message.body);
                onMessageReceived(message.body);  
            });
        },

        onStompError: (frame) => {
            console.error('Broker error:', frame.headers['message']);
            console.error('Details:', frame.body);
        },

        onDisconnect: () => {
            console.log('WebSocket Disconnected');
        },
        onWebSocketClose: (event) => {
            console.warn('WebSocket closed:', event);
        },
    });

    stompClient.activate();

    window.addEventListener('beforeunload', () => stompClient.deactivate());
}

// export function sendMessage(message) {
//     if (stompClient) {
//         stompClient.publish({
//             destination: '/app/sendMessage',
//             body: message,
//         });
//     }
// }

export function disconnectWebSocket() {
    console.log('disconnect WebSocket func called');
    if (stompClient) {
        stompClient.deactivate();
        console.log('WebSocket disconnected');
    }
}