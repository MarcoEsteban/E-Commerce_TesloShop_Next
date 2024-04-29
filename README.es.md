# Proyecto de E-Commerce "TesloShop" - Realizado con Fernando Herrera
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Paso a Paso de la Construccion del Proyecto

### 1. Next.JS - Fonts

Es proyecto utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para optimizar y cargar 
automáticamente Inter, una fuente personalizada de Google

- __Configuracion Personalizada:__ </br>

Creamos una carpeta en `src/config` y su archivo de configuracion `fonts.ts`.

Agregamos el siguiente codigo:

```ts
import { Inter, Montserrat_Alternates } from 'next/font/google';

export const inter = Inter( { subsets: ['latin'] } );

// Creamos Nuestra Propia Fuente:
export const titleFont = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['500', '700']
})
```

Utilizamos nuestra propia `fuente` en los componente que quisieramos de la siguiente forma

```html
<h1 className={`${titleFont.className} font-bold`}>Hola Mundo</h1>
<h1 className={`${titleFont.className}`}>Hola Mundo</h1>
```

### 2. Next.JS - Estructura de Directorios 

- __Estructura Personalizada:__ </br>

>Dentro de la carpeta `/src`  creamos la carpeta `/components, /interfaces, /store`, la carpeta `/store` va a estar nuestro Gestor de Estado Zustand

>Dentro de la carpeta `/components` creamos las siguientes carpetas `/cart, /product, /products, /ui`

>Dentro de la carpeta `/components` creamos nuestro archivo barril `index.ts`

>Dentro de la carpeta `/ui` tendremos otra estructura de carpeta donde estará nuestras carpetas `/sidebar, /header, /footer`

- __Estructura de Carpeta Para Nuestras Rutas de Nuestra Paginas Iniciales:__ </br>

Creando layaouts para nuestra (__Auth__ - Autentificación) y otro para nuestro (__Shop__ - Dashboard administrativo ó E-Commerce)

Dentro de la carpeta `/app` creamos la carpeta para la autenticación llamada `/auth`.

Dentro de la carpeta `/app` creamos la carpeta para nuestro e-commerce llamada `/(shop)`, los `()` es para indicarle que no tome el nombre `shop` como ruta.

Dentro de la carpeta `/auth` y `/(shop)` creamos el archivo `layout.tsx`. Y agregamos el siguiente codigo:

````tsx
export default function RootLayout( { children }: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <main className="min-h-screen">
      { children }
    </main>
  );
}
````

Dentor de la carpeta `/auth`, creamos la carpeta `/login, /new-account`, y cada carpeta con su archivo `page.tsx` correspondiente.

Movemos el archivo `/src/app/page.tsx` a la carpeta `/(shop)`

Con la estrutura de carpeta de nuestro `/app` contamos con las siguiente rutas:

***Layout para la Autenticaciona***
- [http://localhost:3000/auth/login](http://localhost:3000/auth/login) - Tenemos la ruta para el Login.(Ingresar)
- [http://localhost:3000/auth/new-account](http://localhost:3000/auth/new-account) - Tenemos la ruta para el New-Account.(Registrar)

***Layout para el E-Commerce***
- [http://localhost:3000](http://localhost:3000) - Tenemos la ruta para el Inicio de la aplicacion



## Instalaciones Necesaria para el Funcionamiento

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
