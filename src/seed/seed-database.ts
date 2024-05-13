import { initialData } from './seed';


async function main() {

  console.log(initialData)

  console.log( 'Seed Ejecutado correctamente' );
}

// Funcion anonima auto invocada:
(() => {

  if (process.env.NODE_ENV === 'production') return;

  main();
}) ();