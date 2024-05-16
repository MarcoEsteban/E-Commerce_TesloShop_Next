'use client';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export const StockLabel = ( { slug }: Props ) => {

  const [ stock, setStock ] = useState( 0 );
  const [ isLoading, setIsLoading ] = useState( '...Cargando' );

  useEffect( () => {
    getStock();
  }, [] );

  const getStock = async () => {
    // Llamamos al Server-Actions para obtener el Stock del Producto en la DB de acuerdo al 'Slug':
    const inStock = await getStockBySlug( slug );
    setStock( inStock );
  };



  return (
    <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>
      {/* Stock: { inStockProduct } */ }
      stock: { stock }
    </h1>
  );
};