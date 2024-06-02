import type { Metadata } from "next";
import { inter } from '@/config/fonts';

import "./globals.css";
import { Provider } from '@/components';


// Utilizamos un comodin para agregar 'Teslo | Shop' a todas nuestra páginas:
export const metadata: Metadata = {
  title: {
    // %s :: Permite que el titulo de las otras páginas se muestre y acontinuacion se muestre 'Teslo | Shop'.
    template: "%s - Teslo | Shop",
    default: 'Home - Teslo | Shop'
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout( { children }: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        {/* Usamos el Provider para utilizar useSession() del lado del Cliente */}
        <Provider>
          { children }
        </Provider>
      </body>
    </html>
  );
}
