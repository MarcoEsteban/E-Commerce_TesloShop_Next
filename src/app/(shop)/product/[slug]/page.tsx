export const revalidate = 604800; // La pagina se actualizara cada 7 días si esq existe un cambio.

import { notFound } from 'next/navigation';

import { titleFont } from '@/config/fonts';
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { getProductBySlug } from '@/actions';
// import { initialData } from '@/seed/seed';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductBySlugPage( { params }: Props ) {

  const { slug } = params;

  // Llamamos al Server-Actions para Buscar el Producto en la DB de acuerdo al 'Slug':
  const product = await getProductBySlug( slug );

  if ( !product ) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

      {/* Slideshow of Imagen */}
      <div className="col-span-1 md:col-span-2">

        {/* Mobile SlideShow */}
        <ProductMobileSlideShow
          title={ product.title }
          images={ product.images }
          className="block md:hidden"
        />

        {/* Desktop SlideShow */}
        <ProductSlideShow
          title={ product.title }
          images={ product.images }
          className="hidden md:block"
        />

      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

        <StockLabel slug={ slug } />

        <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>
          { product.title }
        </h1>

        <p className="mb-5 text-lg">${ product.price }</p>

        {/* Selector de Tallas */}
        <SizeSelector 
          selectedSize={ product.sizes[0] } 
          availableSizes={ product.sizes } 
        />

        {/* Selector de Cantidad */}
        <QuantitySelector 
          quantity={ 4 } 
        />

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