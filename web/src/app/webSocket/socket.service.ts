// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../Model/Message';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Change the URL to your WebSocket server URL
    this.socket = io('ws://localhost:3000/conversation');

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  leaveRoom() {
    this.socket.emit('leaveAllRooms');
  }

  sendMessage(message: Message): void {
    this.socket.emit('messageToServer', message);
  }

  receiveMessage(): Observable<Message> {
    return new Observable<Message>((observer) => {
      this.socket.on('messageToClient', (message) => {
        observer.next(message);
      });
    });
  }
}
