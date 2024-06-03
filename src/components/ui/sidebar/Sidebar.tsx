'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

import clsx from 'clsx';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';

import { logout } from '@/actions';
import { useUIStore } from '@/store';
import { useEffect } from 'react';

export const Sidebar = () => {

  // Utilizando Zustand:
  const isSideMenuOpen = useUIStore( state => state.isSideMenuOpen );
  const closeSideMenu = useUIStore( state => state.closeSideMenu );

  // Hook de React: Session del lado del Cliente.
  // NOTA :: Esta sesion no va a funcionar igual que la sesion de NextAut, porque esta sesion debe estar envuelta dentro de un <SessionProvider></SessionProvider>
  const { data: session } = useSession(); // <-- Esta session es igual a const session = await auth();
  const isAuthenticated = !!session?.user; // Convertimos a un boolean con la doble negacion '!!'.
  const isAdmin = session?.user.role === 'admin';

  return (
    <div>

      {/********************************* Background Black *********************************/ }
      {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />
        )
      }

      {/************************************** Blur ****************************************/ }
      {
        isSideMenuOpen && (
          <div
            onClick={ closeSideMenu }
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        )
      }

      {/************************************ Sidemenu *************************************/ }
      <nav
        className={
          /* Este Paquete Permite poner clases condicionales de Tailwind */
          clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              'translate-x-full': !isSideMenuOpen //Indico si el menu no esta abierta se va agregar esta clase.
            }
          )
        }>

        {/************************* Icon Slide - Button Cerrar Menu ***********************/ }
        <IoCloseOutline
          size={ 50 }
          className="absolute top-5 right-5 cursor-pointer"
          onClick={ () => closeSideMenu() }
        />

        {/********************************** Input Search *********************************/ }
        <div className="relative mt-14">
          <IoSearchOutline size={ 20 } className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/********************************* Menú de Usuarios ********************************/ }
        {
          isAuthenticated && (
            <>
              <Link
                href="/profile"
                onClick={ closeSideMenu }
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPersonOutline size={ 30 } />
                <span className="ml-3 text-xl">Perfil</span>
              </Link>

              <Link
                href="/"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={ 30 } />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>
            </>
          )
        }

        {
          // Si NO esta Autenticado mostrar el Button de Ingresar.
          !isAuthenticated && (
            <Link
              href="/auth/login"
              onClick={ closeSideMenu }
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogInOutline size={ 30 } />
              <span className="ml-3 text-xl">Ingresar</span>
            </Link>
          )
        }

        {
          // Si esta Autenticado mostrar el Button de Salir.
          isAuthenticated && (
            <button
              className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={ () => {
                closeSideMenu();
                logout();
              } }
            >
              <IoLogOutOutline size={ 30 } />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          )
        }

        {/********************************* Menú Administrativo ******************************/ }
        {
          isAdmin && (
            <>
              {/* Line Separator */ }
              <div className="w-full h-px bg-gray-200 my-10" />

              <Link
                href="/"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoShirtOutline size={ 30 } />
                <span className="ml-3 text-xl">Productos</span>
              </Link>

              <Link
                href="/"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={ 30 } />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

              <Link
                href="/"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPersonOutline size={ 30 } />
                <span className="ml-3 text-xl">Usuarios</span>
              </Link>
            </>
          )
        }

      </nav>

    </div>
  );
};