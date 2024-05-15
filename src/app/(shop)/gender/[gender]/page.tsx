export const revalidate = 60; // Va a revalidar los cambios cada 60 segundos.

// import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderByPage( { params, searchParams }: Props ) {

  const { gender } = params;

  // Comprovamos si llega dato por la URL y lo Parseamos:
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  // Llamamos al Server-Actions para listar los productos:
  const { products, totalPages } = await getPaginatedProductsWithImages( { page, gender: gender as Gender } );

  // Controlamos en caso de que no haya producto:
  if ( products.length === 0 ) redirect( `/gender/${gender}` );

  // Obtiene los productos de acuerdo a la Categoria:
  // const products = seedProducts.filter( product => product.gender === gender );

  const labels: Record<string, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
  };

  // Conprueba que la ruta sea la correcta de lo contrario nos muestra la pagina de error (Not-found)
  // if ( gender === 'kids' ) {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={ `Artículos ${ labels[ gender ] }` }
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={ products } />

      <Pagination totalPages={ totalPages } />
    </>
  );
}