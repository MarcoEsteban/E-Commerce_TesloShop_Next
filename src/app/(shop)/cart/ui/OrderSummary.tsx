'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useEffect, useState } from 'react';

export const OrderSummary = () => {

  // Zustand:
  const { subsTotal, impuesto, total, itemsInCart } = useCartStore( state => state.getSummaryInformation() );

  // React - State :: Para la Hidratacion del componente.
  const [ loaded, setLoaded ] = useState( false );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded ) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">

      <span>Nro Productos</span>
      <span className="text-right">
        {
          itemsInCart === 1
            ? '1 artículo'
            : `${ itemsInCart } artículos`
        }
      </span>

      <span>Subtotal</span>
      <span className="text-right">{ currencyFormat( subsTotal ) }</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{ currencyFormat( impuesto ) }</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{ currencyFormat( total ) }</span>

    </div>
  );
};