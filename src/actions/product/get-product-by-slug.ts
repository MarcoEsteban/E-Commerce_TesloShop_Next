import prisma from '@/lib/prisma';


export const getProductBySlug = async ( slug: string ) => {

  try {

    // Obtenemos todos los Productos de ls DB con sus imagen Incluidas:
    const product = await prisma.product.findFirst( {
      // Indico que me incluya la tabla de ProductImage y me obtenga todas las Images:
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      },

      // Indico que me obtenga solo lo datos donde el slug === slug que le paso por parametro:
      where: {
        slug: slug
      }
    } );

    if ( !product ) return null;

    return {
      ...product,
      images: product.ProductImage.map( image => image.url )
    };

  } catch ( error ) {
    console.log( error );
    throw new Error( 'Error al obtener producto por slug' );

  }
};