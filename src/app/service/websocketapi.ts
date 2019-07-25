import { Client, over } from 'stompjs';
import { WSComponent } from '../wscomponent';

export class WebSocketAPI {

  webSocketEndPoint = 'ws://pc064:8080/ws';
  stompClient: Client;
  component: WSComponent;
  topic: string;

  constructor(component: WSComponent, topic: string) {
    this.component = component;
    this.topic = topic;
  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    this.stompClient = over(new WebSocket(this.webSocketEndPoint));
    this.stompClient.connect(
      {},
      (frame) => this.stompClient.subscribe(this.topic, (event) => this.onMessageReceived(event)),
      (frame) => setTimeout(() => this._connect(), 3000));
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect(() => console.log('Disconnected'));
    }

  }


  onMessageReceived(message) {
    console.log(message);
    this.component.handleMessage(JSON.parse(message.body));
  }
}
