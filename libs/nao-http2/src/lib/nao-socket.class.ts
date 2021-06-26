// import {BehaviorSubject, Observable} from 'rxjs';
// import {share} from 'rxjs/operators';
// import {SocketIOClient} from './nao-socket-io.interface';
// import {NaoHttp2ApiService} from './nao-http2-api.service';
// import socketIO from 'socket.io-client';
//
// interface NaoSocketConfig {
//   url: string;
//   options: SocketIOClient.ConnectOpts;
//   namespace?: string;
// }
//
// const defaultOptions: SocketIOClient.ConnectOpts = {
//   multiplex: true,
//   reconnection: true,
//   reconnectionAttempts: 100,
//   reconnectionDelay: 2000,
//   reconnectionDelayMax: 7000,
//   timeout: 20000,
//   autoConnect: true,
//   upgrade: true,
//   timestampRequests: true
// };
//
// export class NaoSocketClass {
//   public subscribersCounter = 0;
//   public ioSocket: SocketIOClient.Socket;
//   public readonly connected$ = new BehaviorSubject<boolean>(false);
//
//   get isConnected(): boolean {
//     return this.ioSocket.connected;
//   }
//
//   get id(): string {
//     return this.ioSocket.id;
//   }
//
//   get namespace(): string {
//     return this.ioSocket.nsp;
//   }
//
//   constructor(
//     public readonly config: NaoSocketConfig,
//     private readonly naoHttp2ApiService: NaoHttp2ApiService
//   ) {
//   }
//
//   public off(event: string, fn?: Function): void {
//     this.ioSocket.off(event, fn);
//   }
//
//   public on(eventName: string, callback: Function): void {
//     this.ioSocket.on(eventName, callback);
//   }
//
//   public once(eventName: string, callback: Function): void {
//     this.ioSocket.once(eventName, callback);
//   }
//
//   /**
//    * Connect to a socket and wait for callback
//    */
//   public connect(forceReconnect = true): boolean {
//     // todo: check if already connected and skip step
//     const { url, options, namespace } = this.config;
//     // -->Get: token
//     const accessToken = this.naoHttp2ApiService.accessToken;
//     if (this.ioSocket && forceReconnect) {
//       this.ioSocket = this.ioSocket.close();
//     }
//     // -->Init: socket
//     this.ioSocket = socketIO(`${url}/${namespace}`, {
//       ...defaultOptions,
//       ...(options || {}),
//       // transports: ['websocket'],
//       // WORKS
//       transportOptions: {
//         polling: {
//           extraHeaders: {
//             'X-NAO-AUTH': `${accessToken}`,
//             Authorization: `Bearer ${accessToken}`
//           }
//         }
//       }
//     });
//     this.on('connect_timeout', (conn) => {
//       // -->Set: observable
//       this.connected$.next(this.ioSocket.connected);
//     });
//     this.on('connect_error', (conn) => {
//       // -->Set: observable
//       this.connected$.next(this.ioSocket.connected);
//     });
//     this.on('connect', (conn) => {
//       // -->Set: observable
//       this.connected$.next(this.ioSocket.connected);
//     });
//     this.on('disconnect', (conn) => {
//       // -->Set: observable
//       this.connected$.next(this.ioSocket.connected);
//     });
//     // -->Set: connected socket
//     this.ioSocket = this.ioSocket.connect();
//     // -->Return: boolean
//     // console.log('>>>>>>>', this.config);
//     return this.ioSocket.connected;
//   }
//
//   /**
//    * Ensure the connection happens
//    */
//   public ensureConnection(): boolean {
//     if (this.ioSocket && this.ioSocket.connected) {
//       return true;
//     }
//     return this.connect();
//   }
//
//   /**
//    * Check connection
//    */
//   public isSocketConnected(): boolean {
//     return this.ioSocket && this.ioSocket.connected;
//   }
//
//   /**
//    * Destroy websocket connection
//    */
//   public destroyConnection(): boolean {
//     this.disconnect();
//     this.removeAllListeners();
//     return true;
//   }
//
//   /**
//    * Disconnect and remove all listeners
//    */
//   public disconnect(close?: any): any {
//     return this.ioSocket && this.ioSocket.disconnect.apply(this.ioSocket, arguments);
//   }
//
//   /**
//    * Check if a listener exists
//    */
//   public hasListeners(eventName: string): boolean {
//     return this.ioSocket.hasListeners.apply(this.ioSocket, arguments);
//   }
//
//   /**
//    * Get the callback functions of this listener
//    */
//   public listeners(eventName: string): Function[] {
//     return this.ioSocket.listeners.apply(this.ioSocket, arguments);
//   }
//
//   /**
//    * Emmit new socket event
//    */
//   public emit(eventName: string, data?: any, callback?: Function) {
//     return this.ioSocket.emit.apply(this.ioSocket, arguments);
//   }
//
//   /**
//    * Remove event listener
//    */
//   public removeListener(eventName: string, callback?: Function) {
//     return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
//   }
//
//   /**
//    * Remove all listeners
//    */
//   public removeAllListeners() {
//     return this.ioSocket && this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments);
//   }
//
//   /**
//    * Listen to an event
//    */
//   public fromEvent<T>(eventName: string): Observable<T> {
//     this.subscribersCounter++;
//     return new Observable<T>((observer: any) => {
//       this.ioSocket.on(eventName, (data: T) => {
//         observer.next(data);
//       });
//       return () => {
//         if (this.subscribersCounter === 1) {
//           this.ioSocket.removeListener(eventName);
//         }
//       };
//     }).pipe(
//       share()
//     );
//   }
//
//   /**
//    * Emit data to path while checking the connection is active
//    */
//   public emitData<D = any>(path: string, reqBody: any, autoComplete = true): Observable<D> {
//     // -->Request: a single CFP object
//     return new Observable<D>((obs) => {
//       if (!this.connected$.getValue()) {
//         obs.next(null);
//         if (autoComplete) {
//           obs.complete();
//         }
//       } else {
//         // -->Get: session update ws
//         this.emit(path, reqBody, (data, err) => {
//           if (err) {
//             obs.error(err);
//           } else {
//             obs.next(data);
//             if (autoComplete) {
//               obs.complete();
//             }
//           }
//         });
//       }
//     });
//   }
//
//   /**
//    * Listen to an event once
//    */
//   public fromOneTimeEvent<T>(eventName: string): Promise<T> {
//     return new Promise<T>(resolve => this.once(eventName, resolve));
//   }
//
//   public onDestroy(): void {
//     if (this.connected$) {
//       this.connected$.unsubscribe();
//     }
//   }
//
// }
