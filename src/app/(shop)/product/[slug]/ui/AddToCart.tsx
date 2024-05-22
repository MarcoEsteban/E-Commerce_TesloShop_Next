'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const AddToCart = ( { product }: Props ) => {

  // Utilizando Zustand:
  const addProductToCart = useCartStore( state => state.addProductToCart );

  const [ size, setSize ] = useState<Size | undefined>();
  const [ quantity, setQuantity ] = useState<number>( 1 );
  const [ posted, setPosted ] = useState<boolean>( false );

  const addTocart = () => {
    setPosted( true );

    if ( !size ) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[ 0 ]
    };
    addProductToCart( cartProduct );

    // Retornamos a su valor inicial una vez se agrege al carrito:
    setPosted( false );
    setQuantity( 1 );
    setSize( undefined );
  };

  // (size) => console.log( size ) :: Esto es igual a 'console.log' y realiza la misma funcionalidad
  // setSize                       :: Esto es igual a colocar '(size) => setSize(size)' y realiza la misma funcionalidad
  return (
    <>
      {
        posted && !size && (
          // fade-in :: Add a animation al aparecer.
          <span className="mt-2 text-red-500 text-sm font-semibold fade-in">
            Debe de seleccionar una talla*
          </span>
        )
      }

      {/* Selector de Tallas */ }
      <SizeSelector
        selectedSize={ size }
        availableSizes={ product.sizes }
        onSizeChanged={ setSize }
      />

      {/* Selector de Cantidad */ }
      <QuantitySelector
        quantity={ quantity }
        onQuantityChanged={ setQuantity }
      />

      {/* Button */ }
      <button
        onClick={ addTocart }
        className="btn-primary my-5"
      >
        Agregar al cariito
      </button>
    </>

  );
};