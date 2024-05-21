export const revalidate = 604800; // La pagina se actualizara cada 7 días si esq existe un cambio.

import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

import { titleFont } from '@/config/fonts';
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { getProductBySlug } from '@/actions';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

// -----------------
// Metadata Dynamic:
// -----------------
export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // Get the params of the URL:
  const slug = params.slug;

  // Obteniendo la Informacion de Producto con los Server-Actions desde la DB:
  const product = await getProductBySlug( slug );

  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images: [], // https://misitioweb.com/products/image.png
      images: [ `products/${ product?.images[ 1 ] }` ]
    },
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

      {/* Slideshow of Imagen */ }
      <div className="col-span-1 md:col-span-2">

        {/* Mobile SlideShow */ }
        <ProductMobileSlideShow
          title={ product.title }
          images={ product.images }
          className="block md:hidden"
        />

        {/* Desktop SlideShow */ }
        <ProductSlideShow
          title={ product.title }
          images={ product.images }
          className="hidden md:block"
        />

      </div>

      {/* Detalles */ }
      <div className="col-span-1 px-5">

        <StockLabel slug={ slug } />

        <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>
          { product.title }
        </h1>

        <p className="mb-5 text-lg">${ product.price }</p>

        {/* Agregando desde un Client-Side-Rendering */ }
        <AddToCart product={ product } />

        {/* Descripción */ }
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>

      </div>

    </div>
  );
}