import NextAuth, { DefaultSession } from 'next-auth';


// Archivo de definicion de TypeScript:
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: string;
      image?: string;
    } & DefaultSession[ 'user' ];
  }
}