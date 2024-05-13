import { initialData } from './seed';
import prisma from '../lib/prisma';


async function main() {

  // 1. Borrar todos los datos de las Tablas | Borrar todos los Registros Previos
  await Promise.all( [
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ] );



  console.log( 'Seed Ejecutado correctamente' );
}

// Funcion anonima auto invocada:
( () => {

  if ( process.env.NODE_ENV === 'production' ) return;

  main();
} )();