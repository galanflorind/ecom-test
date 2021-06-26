import {HttpHeaders, HttpParams} from '@angular/common/http';

export namespace NaoSocketInterface {
  export interface ChangesFeed<T> {
    new_val: T;
    old_val: T;
  }
  export interface DataFeed<T> {
    data: T;
    ok: boolean;
    event?: string;
    error?: any;
  }
  export interface GatewayTrackRequest {
    gatewayName: string;
    docId?: string;
    tracker: string;
    naoQueryOptions?: any;
    userSessionId?: string;
  }
}

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export enum HttpReponseType {
  arraybuffer = 'arraybuffer',
  json = 'json',
  blob = 'blob',
  pdf = 'application/pdf',
}

export enum HttpRequestType {
  json = 'application/json',
  data = 'multipart/form-data'
}

export interface NaoWsConfig {
  url?: string;
  options?: {
    path: string;
  };
  namespace?: string;
  enabled: boolean;
}

export type HttpReponseTypes = 'arraybuffer'|'json'|'blob'|'pdf';
