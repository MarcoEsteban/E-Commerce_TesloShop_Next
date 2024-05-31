import prisma from '@/lib/prisma';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [ // Dentro va la configuracion de [Google, GitHub, Nuestra_Propia_Autenticacion ...]
    Credentials( {
      async authorize( credentials ) {
        const parsedCredentials = z
          .object( {
            email: z.string().email(),
            password: z.string().min( 6 )
          } )
          .safeParse( credentials );

        // Comprovamos si cumple la validación de Zod
        if ( !parsedCredentials.success ) return null;

        // Obtenemos el Data del Formulario
        const { email, password } = parsedCredentials.data;

        // Buscar el correo en la DB
        const user = await prisma.user.findUnique( { where: { email: email.trim().toLowerCase() } } );
        if ( !user ) return null;

        // Comparar las contraseñas con la DB
        if ( !bcryptjs.compareSync( password, user.password ) ) return null;

        // Regresar el Usuario
        // password: _ :: Indico que el password sea reconocido como un '_'.
        const { password: _, ...rest } = user;
        console.log( { rest } );

        return rest;
      },
    } ),
  ],
};

export const { signIn, signOut, auth } = NextAuth( authConfig );
// signIn  :: Funcion por defecto de NextAuth que nos permite el inicio de session.
// signOut :: Funcion por defecto de NextAuth que nos permite cerrar session.
// auth    :: Es el middleware