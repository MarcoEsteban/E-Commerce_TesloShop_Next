'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {

  // Usando React Hook Form:
  // register     :: Permite registrar un campo(Input), y obtener sus datos y cambios que se realizan.
  // handleSubmit :: Permite la propagacion del formulario, y evitar que se realice un full refresh.
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async ( data ) => {

    const { name, email, password } = data;

    console.log( { name, email, password } );
    // Server Actions

  };

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="flex flex-col">

      <label htmlFor="name">Nombre completo</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500",
            { 'border-red-500': errors.name },
          )
        }
        type="text"
        autoFocus
        { ...register( 'name', { required: true } ) }
      />
      {/* Mostrando el Error */ }
      {/* {errors.name && <span className="bg-red-500 p-1 w-full text-white">Este campos es Requerido</span> } */ }

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none relative focus:ring-1 focus:ring-blue-500",
            { 'border-red-500': errors.email },
          )
        }
        type="email"
        { ...register( 'email', { required: true, pattern: /^\S+@\S+$/i } ) }
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-1 focus:ring-blue-500",
            { 'border-red-500': errors.password }
          )
        }
        type="password"
        { ...register( 'password', { required: true, minLength: 8 } ) }
      />

      <button
        className="btn-primary">
        Crear cuenta
      </button>

      {/* divisor line */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  );
};