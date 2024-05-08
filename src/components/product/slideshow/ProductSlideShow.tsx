'use client';

import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import Image from 'next/image';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ( { images, title, className }: Props ) => {

  // Estado para connectar las imagenes de 'SlideShow' && 'Visualizador de Imagen':
  const [ thumbsSwiper, setThumbsSwiper ] = useState<SwiperObject>();

  return (
    <>
      {/* Slide de Images */}
      <Swiper
        // style={ {
        //   '--swiper-navigation-color': '#fff',
        //   '--swiper-pagination-color': '#fff',
        // } as React.CSSProperties
        // }
        spaceBetween={ 10 }
        navigation={ true }
        autoplay={{ // Para que cada 2segundo automaticamente cambie la imagen
          delay: 2000
        }}
        thumbs={ { swiper: thumbsSwiper } }
        modules={ [ FreeMode, Navigation, Thumbs, Autoplay ] } // Autoplay permite el cambio de img dinamico.
        className="mySwiper2"
      >
        {
          images.map( image => (
            <SwiperSlide key={ image }>
              <Image
                width={ 1024 }
                height={ 800 }
                src={ `/products/${ image }` }
                alt={ title }
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ) )
        }
      </Swiper>
      
      {/* Visor de Imagen || Previsualizador */}
      <Swiper
        onSwiper={ setThumbsSwiper }
        spaceBetween={ 10 }
        slidesPerView={ 4 }
        freeMode={ true }
        watchSlidesProgress={ true }
        modules={ [ FreeMode, Navigation, Thumbs ] }
        className="mySwiper"
      >
        {
          images.map( image => (
            <SwiperSlide key={ image }>
              <Image
                width={ 300 }
                height={ 300 }
                src={ `/products/${ image }` }
                alt={ title }
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ) )
        }
      </Swiper>
    </>
  );
};