'use server';

import prisma from '@/lib/prisma';


interface PaginationOptions {
  page?: number;
  take?: number;
}


// Creando Server-Actions para cargar los productos desde la DB:
export const getPaginatedProductsWithImages = async ( {
  page = 1,  // Numero de pagina por defecto.
  take = 12, // Número de articulo por defecto que se mostrara.
}: PaginationOptions ) => {

  if ( isNaN( Number( page ) ) ) page = 1;
  if ( page < 1 ) page = 1;

  try {

    // Utilizar una Promesa para ser mas Eficiente:
    // await Promise.all([

    // 1. Obtener los productos de la DB:
    const products = await prisma.product.findMany( {
      take: take,                // Indicamos el numero de articulos o de registro que nos mostrara desde la DB.
      skip: ( page - 1 ) * take, // Es lo que me va a permitir realizar la paginación, esto lo que nos va a permitir saltar de 4 en 4 o de acuerdo al take.
      include: {                 // Indicamos que incluya  tambien el registro de la Tabla( ProductImage ).
        ProductImage: {          // Agregamos la Tabla con la que esta Relacionada y queremos obtner su Datos.
          take: 2,               // Indico que solo me obtenga 2 registros o datos de la Tabla.
          select: {              // Indico que los 2 registros que quiero obtener o seleccionar sea de la columna llamada (url).
            url: true
          }
        }
      }
    } );

    // 2. Obtener el total de Páginas
    // Todo:
    const totalCount = await prisma.product.count( {} );
    const totalPages = Math.ceil( totalCount / take );

    // ])

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map( product => ( {
        ...product,                                            // Realizamos un (...rest) es decir el resto de los campos.
        images: product.ProductImage.map( image => image.url ) // Indico que agrege este campo mas a los productos.
      } ) )
    };

  } catch ( error ) {
    throw new Error( 'No se pudo cargar los productos' );
  }

};