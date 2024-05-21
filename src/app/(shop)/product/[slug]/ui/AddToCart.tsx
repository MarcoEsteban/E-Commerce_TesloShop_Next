'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/interfaces';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const AddToCart = ( { product }: Props ) => {

  const [ size, setSize ] = useState<Size | undefined>();
  const [ quantity, setQuantity ] = useState<number>( 1 );

  // (size) => console.log( size ) :: Esto es igual a 'console.log' y realiza la misma funcionalidad
  // setSize                       :: Esto es igual a colocar '(size) => setSize(size)' y realiza la misma funcionalidad
  return (
    <>
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
      <button className="btn-primary my-5">
        Agregar al cariito
      </button>
    </>

  );
};