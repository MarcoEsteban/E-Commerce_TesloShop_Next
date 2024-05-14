'use server';

import prisma from '@/lib/prisma';

// Creando Server-Actions para cargar los productos desde la DB:
export const getPaginatedProductsWithImages = async () => {

  try {

    // Obtenemos los productos de la DB:
    const products = await prisma.product.findMany( {
      take: 3,
      include: {        // Indicamos que incluya  tambien el registro de la Tabla( ProductImage ).
        ProductImage: { // Agregamos la Tabla con la que esta Relacionada y queremos obtner su Datos.
          take: 2,      // Indico que solo me obtenga 2 registros o datos de la Tabla.
          select: {     // Indico que los 2 registros que quiero obtener o seleccionar sea de la columna llamada (url).
            url: true
          }
        }
      }
    } );

    return {
      currentPage: 1,
      totalPages: 10,
      products: products.map( product => ( {
        ...product,
        images: product.ProductImage.map( image => image.url )
      } ) )
    };

  } catch ( error ) {
    throw new Error( 'No se pudo cargar los productos' );
  }

};