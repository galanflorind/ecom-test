import { NaoHttp2Interface } from './nao-http2.interface';

/**
 * Generate the API route from environment config
 */
const generateApiRoute = (server: NaoHttp2Interface.ApiSettings): string => {
  return `${server.protocol}://${server.url}:${server.port}/${server.prefix}`;
};

/**
 * Generate a room name from a namespace
 */
const generateNamespaceRoomName = (company: string, cfpPath: string, roomName: string = null): string => {
  return `NAO_${company}_${cfpPath}${roomName? '_'+ roomName : ''}`
};

export {
  generateApiRoute,
  generateNamespaceRoomName
};
