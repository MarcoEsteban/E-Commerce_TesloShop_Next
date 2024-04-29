
import { Inter, Montserrat_Alternates } from 'next/font/google';


export const inter = Inter( { subsets: ['latin'] } );

// Creamos Nuestra Propia Fuente:
export const titleFont = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['500', '700']
})