'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ( { name, email, password }: UserRegister ) => {
  try {

    const user = await prisma.user.create( {
      data: {
        name: name,
        email: email.trim().toLowerCase(),
        password: bcryptjs.hashSync( password )
      },
      // Indico los campos que quiero que me seleccione para mostrar.
      select: {
        id: true,
        name: true,
        email: true,
      }
    } );

    return {
      ok: true,
      user: user,
      message: 'Usuario creado correctamente'
    };

  } catch ( error ) {
    console.log('Error Register: ', { error } );
    return {
      ok: false,
      message: 'No se pudo crear el usuario'
    };
  }
};