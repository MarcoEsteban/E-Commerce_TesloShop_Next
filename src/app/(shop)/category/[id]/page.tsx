// import { notFound } from 'next/navigation';
import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

export default function ( { params }: Props ) {

  const { id } = params;

  // Obtiene los productos de acuerdo a la Categoria:
  const products = seedProducts.filter( product => product.gender === id );

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
  };

  // Conprueba que la ruta sea la correcta de lo contrario nos muestra la pagina de error (Not-found)
  // if ( id === 'kids' ) {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={ `Artículos ${ labels[ id ] }` }
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={ products } />
    </>
  );
}