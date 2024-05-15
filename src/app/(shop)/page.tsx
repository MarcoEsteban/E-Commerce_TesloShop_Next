export const revalidate = 60; // Va a revalidar los cambios cada 60 segundos.

import { redirect } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

// Esta interfaz es para indicar lo que vamos a recibir por la URL:
interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home( { searchParams }: Props ) {

  // Comprovamos si llega dato por la URL y lo Parseamos:
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  // Llamamos al Server-Actions para listar los productos:
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages( { page } );

  // Controlamos en caso de que no haya producto:
  if ( products.length === 0 ) redirect( '/' );

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={ products } />

      <Pagination totalPages={ totalPages } />
    </>
  );
}
