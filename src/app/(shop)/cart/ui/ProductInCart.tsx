'use client';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductInCart = () => {

  // Zustand
  const productsInCart = useCartStore( state => state.cart );
  const updateProductQuantity = useCartStore( state => state.updateProductQuantity );

  // React
  const [ loaded, setLoaded ] = useState( false );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded ) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {
        productsInCart.map( product => (
          <div key={ `${ product.slug } = ${ product.size }` } className="flex">
            <Image
              src={ `/products/${ product.image } ` }
              className="mr-5 rounded"
              width={ 100 }
              height={ 100 }
              alt={ product.title }
            />

            <div>
              <Link 
                className="hover:underline cursor-pointer"
                href={ `/product/${ product.slug }` }>
                { product.size } - { product.title }
              </Link>
              <p>${ product.price }</p>
              <QuantitySelector
                quantity={ product.quantity }
                onQuantityChanged={ ( quantity => updateProductQuantity( product, quantity ) ) }
              />
              <button className="underline">Remover</button>
            </div>
          </div>
        ) )
      }
    </>
  );
};