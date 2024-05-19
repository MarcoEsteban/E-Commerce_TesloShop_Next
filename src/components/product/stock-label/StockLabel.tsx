'use client';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export const StockLabel = ( { slug }: Props ) => {

  const [ stock, setStock ] = useState( 0 );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () => {
    getStock();
  }, [] );

  const getStock = async () => {
    // Llamamos al Server-Actions para obtener el Stock del Producto de la DB de acuerdo al 'Slug':
    const inStock = await getStockBySlug( slug );
    setStock( inStock );
    setIsLoading( false );
  };



  return (
    <>
      {

        isLoading
          ? (
            <h1 className={ `${ titleFont.className } antialiased font-bold text-xl animate-pulse bg-gray-200` }>
              &nbsp;
            </h1>
          ) : (
            <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>
              {/* Stock: { inStockProduct } */ }
              stock: { stock }
            </h1>
          )

      }
    </>
  );
};