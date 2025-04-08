declare module 'jwt-encode' {
  export default function jwtEncode(payload: any, secret: string, options?: any): string;
}