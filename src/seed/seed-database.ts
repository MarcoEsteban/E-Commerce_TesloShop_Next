import { initialData } from './seed';
import prisma from '../lib/prisma';


async function main() {

  // ----------------------------------------------------------------------------
  // 1. Borrar todos los datos de las Tablas | Borrar todos los Registros Previos
  // ----------------------------------------------------------------------------
  // await Promise.all( [
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ] );

  // --------------------------------------------------
  // 2. Insertando los Registros a la Tabla de Category
  // --------------------------------------------------
  // Obteniendo las categorias y productos del Seed:
  const { categories, products, users } = initialData;

  // Recorremos las categorias del 'seed' para obtener los nombres: [{name: 'shirts'}, ...etc]
  const categoriesData = categories.map( ( name ) => ( { name } ) );

  // Insetar datos a la Tabla Category de la DB:
  await prisma.category.createMany( {
    data: categoriesData
  } );

  // Obteniendo las categorias de la DB:
  const categoriesDB = await prisma.category.findMany();

  // Recorremos la categoria de la DB para cambiar el formato de retorno: { name: 'id'} == {shirts: '9c73675c-aba0-441a-9505-ab3d48572943'}
  const categoriesMap = categoriesDB.reduce( ( map, category ) => {

    // map :: El map es igual al objeto vacio, que al final tiene { llave: valor } === { name: 'id'}
    // Indico que el valor de la llave del Objeto va a ser el nombre(name) de la category y el valor de la llave va a ser el id de category
    map[ category.name.toLowerCase() ] = category.id; // {shirt: '9c73675c-aba0-441a-9505-ab3d48572943'}
    return map;

  }, {} as Record<string, string> ); // Record< string=shirts, string=categoryID> 

  // ----------------------------------------------------------------
  // 3. Insertando los Registros a la Tabla de Product y ProductImage 
  // ----------------------------------------------------------------
  products.forEach( async ( product ) => {
    const { images, type, ...rest } = product;

    // Insertar Todos los Productos:
    const dbProduct = await prisma.product.create( {
      data: {
        ...rest,
        categoryId: categoriesMap[ type ]
      }
    } );

    // Insertar Todas las Imagenes de los Productos:
    const imagesData = images.map( image => ( {
      url: image,
      productId: dbProduct.id
    } ) );

    await prisma.productImage.createMany( {
      data: imagesData
    } );

  } );

  // ----------------------------------------------------------------
  // 4. Insertando los Registros a la Tabla de User
  // ----------------------------------------------------------------
  await prisma.user.createMany( {
    data: users
  } );


  console.log( 'Seed Ejecutado correctamente' );
}

// Funcion anonima auto invocada:
( () => {

  if ( process.env.NODE_ENV === 'production' ) return;

  main();
} )();