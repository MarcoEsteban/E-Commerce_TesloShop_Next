import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default function ( { params }: Props ) {

  const { id } = params;

  // Conprueba que la ruta sea la correcta de lo contrario nos muestra la pagina de error (Not-found)
  if ( id === 'kids' ) {
    notFound();
  }

  return (
    <div>
      <h1>Categoria Page { id }</h1>
    </div>
  );
}