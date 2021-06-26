// import { NaoHttp2ApiService } from './nao-http2-api.service';
// import { Inject, Injectable } from '@angular/core';
// import { NaoSocketClass } from './nao-socket.class';
// import { first } from 'rxjs/operators';
// import { Observable, of } from 'rxjs';
// import { SocketIOClient } from './nao-socket-io.interface';
// import { NaoSocketInterface } from './nao-socket.interface';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class NaoSocketService {
//   public readonly socket: NaoSocketClass;
//   public ioSockets: { [index: string]: NaoSocketClass } = {};
//
//   constructor(
//     @Inject('apiConfig') private readonly config,
//     private readonly naoHttp2ApiService: NaoHttp2ApiService
//   ) {
//     this.socket = new NaoSocketClass(this.config, this.naoHttp2ApiService);
//   }
//
//   /**
//    * Return an Nao Socket connected to this namespace
//    */
//   public getSocket(namespace: string, forceReset = false): NaoSocketClass {
//     if (this.config && this.config.webSocket  && this.config.webSocket.enabled) {
//       // -->Check: if exists
//       if (!(this.ioSockets[namespace] instanceof NaoSocketClass)) {
//         this.ioSockets[namespace] = new NaoSocketClass({
//           url: this.config.webSocket.url,
//           options: this.config.webSocket.options,
//           namespace
//         }, this.naoHttp2ApiService);
//       }
//       return this.ioSockets[namespace];
//     } else {
//       throw new Error(`Websockets are disabled in your environment`);
//     }
//   }
//
//   /**
//    * Return an Nao Socket connected to this namespace
//    */
//   public connectToNamespace(namespace: string, forceReset = false): NaoSocketClass {
//     // -->Check: if exists
//     this.getSocket(namespace);
//     // -->Check: if connected
//     if (this.ioSockets[namespace].connected$.getValue() === false) {
//       // -->Ensure: connection
//       this.ioSockets[namespace].connect();
//     }
//     return this.ioSockets[namespace];
//   }
//
//   /**
//    * Listen to an event
//    */
//   public fromEvent<T>(namespace: string, eventName: string): Observable<T> {
//     // -->Check: if exists
//     if (this.ioSockets[namespace]) {
//       // -->Ensure: connection
//       return this.ioSockets[namespace].fromEvent<T>(eventName);
//     }
//     return null;
//   }
//
//   /**
//    * Remove a event Listen
//    */
//   public removeEvent<T>(namespace: string, eventName: string): void {
//     // -->Check: if exists
//     if (this.ioSockets[namespace]) {
//       // -->Ensure: connection
//       this.ioSockets[namespace].off(eventName);
//     }
//     return null;
//   }
//
//   public disconnectFromNamespace(namespace: string): void {
//     // -->Check: if exists
//     if (this.ioSockets[namespace]) {
//       // -->Ensure: connection
//       this.ioSockets[namespace].destroyConnection();
//     }
//   }
//
//   public isConnected$(namespace: string): Observable<boolean> {
//     return this.ioSockets[namespace].connected$.asObservable();
//   }
//
//   public isConnected(namespace: string): boolean {
//     return this.ioSockets[namespace] ? this.ioSockets[namespace].isSocketConnected() : false;
//   }
//
//   /**
//    * Join/leave a room defined via gateway
//    * @NEW
//    */
//   public gateway(action: 'join'|'leave', namespace: string, data: { gatewayName: string, docId?: string, naoQueryOptions?: any }): Observable<any> {
//     return this.getSocket(namespace).emitData<any>('gateway/room', { action, namespace, data }).pipe(first());
//   }
//
//   /**
//    * Join/leave a room defined via gateway
//    * @NEW
//    */
//   public track(action: 'start'|'stop', namespace: string, data: NaoSocketInterface.GatewayTrackRequest): Observable<any> {
//     return this.getSocket(namespace).emitData<any>('tracker/room', { action, namespace, data }).pipe(first());
//   }
//
//
//   /**
//    * Join a room inside a namespace
//    * @deprecated > migrate to joinGateway()
//    */
//   public joinNamespaceRoom(namespace: string, roomName: string): Observable<any> {
//     return this.ioSockets[namespace].emitData<any>('join', { roomName }).pipe(first());
//   }
//
//   /**
//    * Leave a room
//    * @deprecated
//    */
//   public leaveNamespaceRoom(namespace: string, roomName: string): Observable<any> {
//     if (this.ioSockets && this.ioSockets[namespace] && this.ioSockets[namespace]) {
//       return this.ioSockets[namespace].emitData<any>('leave', { roomName }).pipe(first());
//     } else {
//       return of({ ok: true });
//     }
//   }
//
//   /**
//    * @deprecated
//    */
//   public emitEventToNamespaceRoom(namespace: string, path: string, data: any = {}): SocketIOClient.Socket {
//     return this.ioSockets[namespace].ioSocket.emit(path, data);
//   }
//
//   /**
//    * @deprecated
//    */
//   public async emitEventToNamespaceRoomAsync(namespace: string, path: string, data: any = {}): Promise<any> {
//     return await new Promise((resolve, reject) => {
//       this.ioSockets[namespace].ioSocket.emit(path, data, (response) => response.ok ? resolve(response) : reject(response));
//     });
//   }
//
//   /**
//    * @deprecated
//    */
//   public getNamespaceMessages(namespace: string, eventName: string): Observable<any> {
//     return this.ioSockets[namespace].fromEvent<any>(eventName);
//   }
//
// }
