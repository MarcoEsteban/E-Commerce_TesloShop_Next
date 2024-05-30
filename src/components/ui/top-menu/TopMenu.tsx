'use client';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { ItemCard } from '../../../../../03-admin-todos/src/shopping-cart/components/ItemCard';

export const TopMenu = () => {

  // Utilizando Zustand:
  const openSideMenu = useUIStore( state => state.openSideMenu );
  const getTotalItem = useCartStore( state => state.getTotalItem() );

  // Solucionando el Problema de la Rehidratacion:
  const [ loaded, setLoaded ] = useState( false );

  // Permita que el Servidor y el Cliente Renderize lo mismo
  useEffect( () => {
    setLoaded( true );
  }, [] );


  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */ }
      <div>

        <Link href="/">
          <span className={ `${ titleFont.className } antialiased font-bold` }>Teslo</span>
          <span> | Shop</span>
        </Link>

      </div>

      {/* Center Menu */ }
      <div className="hidden sm:block">

        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Hombres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Mujeres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Niños</Link>

      </div>

      {/* Search, Cart, Menu */ }
      <div className="flex items-center">

        <Link href="search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link 
          href={
            ( (getTotalItem === 0) && loaded)
              ? '/empty'
              : '/cart'
          } 
          className="mx-2"
        >
          <div className="relative">
            {
              (loaded &&  getTotalItem > 0) && (
                <span className="fade-in absolute -top-2 -right-2 px-1 text-xs rounded-full font-bold bg-blue-700 text-white">
                  { getTotalItem }
                </span>
              )
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button onClick={ openSideMenu } className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Menú
        </button>
      </div>

    </nav>
  );
};