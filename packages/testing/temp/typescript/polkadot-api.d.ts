
// Mock type definitions for polkadot-api
declare module 'polkadot-api' {
  export function createClient(provider: any): any;
  export function getSmProvider(connection: any): any;
  export function start(): any;
  export const chainSpec: any;
  export const polkadot: any;
  export const kusama: any;
  export const westend: any;
  export const rococo: any;
}
