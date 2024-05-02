import { notFound } from 'next/navigation';
import { initialData } from '@/seed/seed';
import { titleFont } from '@/config/fonts';

interface Props {
  params: {
    slug: string;
  };
}

export default function ( { params }: Props ) {

  const { slug } = params;
  // Buscamos el producto:
  const product = initialData.products.find( product => product.slug === slug );

  if ( !product ) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

      {/* Slideshow of Imagen */}
      <div className="col-span-1 md:grid-cols-2 bg-red-300">
        hola
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5 bg-blue-300">
        <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>
          { product.title }
        </h1>
        <p className="mb-5 text-lg">${ product.price }</p>

        {/* Selector de Tallas */}

        {/* Selector de Cantidad */}

        {/* Button */}
        <button className="btn-primary my-5">
          Agregar al cariito
        </button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>

      </div>

    </div>
  );
}