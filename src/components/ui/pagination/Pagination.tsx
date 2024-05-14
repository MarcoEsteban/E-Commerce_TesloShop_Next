'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  totalPages: number;
}

export const Pagination = ( { totalPages }: Props ) => {

  // ? Funcionamiento de la Paginación:
  const pathname = usePathname();                                // Ruta(URL) donde nos encontramos.
  const searchParams = useSearchParams();                        // Parametros que recivimos de la URL.
  const currentPage = Number( searchParams.get( 'page' ) ) ?? 1; // Número de pagina actual en la que nos encotramos.

  const createPageUrl = ( pageNumber: number | string ) => {

    const params = new URLSearchParams( searchParams ); // Nos permite construir nuestro parametros en la URL.

    // params.toString() => Devuelve los parametros que tiene actualmente en la URL.
    if ( pageNumber === '...' ) return `${ pathname }?${ params.toString() }`;

    // Nos devuelve a la ruta actual donde nos encontramos.
    if ( Number( pageNumber ) <= 0 ) return `${ pathname }`;

    // Cuando hagamos  Next > y no haya más página nos retorna donde estamos.
    if ( +pageNumber > totalPages ) return `${ pathname }?${ params.toString() }`;

    // Crea los parametros(?page=3) para la paginas 
    params.set( 'page', pageNumber.toString() );
    return `${ pathname }?${ params.toString() }`

  };


  return (
    <div className="flex justify-center text-center mt-10 mb-32">
      <nav aria-label="Page navigation example">

        <ul className="flex list-style-none">
          <li className="page-item">
            <Link className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={ createPageUrl( currentPage -1 ) }
            >
              <IoChevronBackOutline size={ 30 } />
            </Link>
          </li>

          <li className="page-item"><a
            className="page-link relative block py-2 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#">1</a></li>

          <li className="page-item active"><a
            className="page-link relative block py-2 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md font-semibold"
            href="#">2 <span className="visually-hidden"></span></a></li>

          <li className="page-item"><a
            className="page-link relative block py-2 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#">3</a></li>

          <li className="page-item"><a
            className="page-link relative block py-2 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#">...</a></li>

          <li className="page-item"><a
            className="page-link relative block py-2 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#">50</a></li>

          <li className="page-item">
            <a className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={ createPageUrl( currentPage + 1 ) }
            >
              <IoChevronForwardOutline size={ 30 } />
            </a>
          </li>
        </ul>

      </nav>
    </div>
  );
};