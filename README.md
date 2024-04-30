# Proyecto de E-Commerce "TesloShop" - Realizado con Fernando Herrera
<hr/>

# Development
Pasos para levantar la app en desarrollo

# Paso a Paso de la Construccion del Proyecto

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

> - __ESTRUCTURA DE CARPETA PERSONALIZADA:__ </br>

Dentro de la carpeta `/src`  creamos la carpeta `/components, /interfaces, /store`, la carpeta `/store` va a estar nuestro Gestor de Estado Zustand

Dentro de la carpeta `/components` creamos las siguientes carpetas `/cart, /product, /products, /ui`

Dentro de la carpeta `/components` creamos nuestro archivo barril `index.ts`

Dentro de la carpeta `/ui` tendremos otra estructura de carpeta donde estará nuestras carpetas `/sidebar, /header, /footer`

> - __ESTRUCTURA DE CARPETA PARA NUESTRAS RUTAS INICIALES DEL LAYOUT:__ </br>

Creando layaouts para nuestra (__Auth - Autentificación__) y otro para nuestro (__Shop - Dashboard administrativo ó E-Commerce__)

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

Dentro de la carpeta `/auth`, creamos la carpeta `/login, /new-account`, y cada carpeta con su archivo `page.tsx` correspondiente.

Movemos el archivo `/src/app/page.tsx` a la carpeta `/(shop)`

Con la estrutura de carpeta de nuestro `/app` contamos con las siguiente rutas:

***Layout para la Autenticaciona***
- [http://localhost:3000/auth/login](http://localhost:3000/auth/login) - Tenemos la ruta para el Login.(Ingresar)
- [http://localhost:3000/auth/new-account](http://localhost:3000/auth/new-account) - Tenemos la ruta para el New-Account.(Registrar)

***Layout para el E-Commerce***
- [http://localhost:3000](http://localhost:3000) - Tenemos la ruta para el Inicio de la aplicacion

> - __CREANDO RUTA DE LA APLICACION DEL E-COMMERCE:__ </br>

Dentro de la carpeta `/(shop)`, creamos las carpetas `/admin, /cart, /category, /checkout, /empty, /orders, /product, /products`.

Dentro de cada carpeta `/admin, /cart, /checkout, /empty, /orders, /products` creamos su archivo `page.tsx` correspondiente.

Dentro de la carpeta `/category` creamos una carpeta `/[id]` y creamos el archivo `page.tsx`.

Dentro de la carpeta `/checkout` creamos una carpeta `/address` y creamos el archivo `page.tsx`.

Dentro de la carpeta `/orders` creamos una carpeta `/[id]` y creamos el archivo `page.tsx`.

Dentro de la carpeta `/product` creamos una carpeta `/[slug]` y creamos el archivo `page.tsx`.

Dentro de cada `page.tsx` copiamos el siguiente codigo:
```tsx
export default function() {
  return (
    <div>
      <h1>Name Page</h1>
    </div>
  )
}
```

***Rutas para el E-Commerce***
- [http://localhost:3000/admin](http://localhost:3000/admin) - Es la pagina donde el administrador pueda crear productos, entre otras cosas.
- [http://localhost:3000/cart](http://localhost:3000/cart) - Es la pagina del carrito de compra de la aplicacion.
- [http://localhost:3000/category/id_abc](http://localhost:3000/category/id_abc) - Son las categorias que vamos a manejar como [Hombre, Mujeres y Niños]. Vamos a resivir argumento por la URL que seria el [id] de la categoria.
- [http://localhost:3000/checkout](http://localhost:3000/checkout) - Es la pagina donde se va a realizar el cierre de la venta.
- [http://localhost:3000/checkout/address](http://localhost:3000/checkout/address) - Es la información del usuario a donde le quiere llevar.
- [http://localhost:3000/empty](http://localhost:3000/empty) - Es la pagina donde se va a redireccionar si el carrito de compra esta vacio.
- [http://localhost:3000/orders](http://localhost:3000/orders) - Es la pagina donde se va a listar todas las oredenes.
- [http://localhost:3000/orders/id-order](http://localhost:3000/orders/id-order) - Es la pagina donde vamos a ver una orden en particular.
- [http://localhost:3000/product](http://localhost:3000/product) - Es la pagina donde se va a listar todas las oredenes.
- [http://localhost:3000/product/product123](http://localhost:3000/product/product123) - Es la pagina donde se va a mostrar el productos, con un identificador unico humanamente legible. Y tambien controlar errores personalizados por páginas.
- [http://localhost:3000/products](http://localhost:3000/products) - Es la pagina donde se va a listar los productos.

# Instalaciones Necesaria para el Funcionamiento
### React Icons
````
npm i react-icons
````
- [React Icons ](https://react-icons.github.io/react-icons/) - Documentación

### Zustand
````
npm i zustand
````
- [Zustand](https://zustand-demo.pmnd.rs/) - Documentación

### CLSX
````
npm i clsx
````
- [CLSX](https://www.npmjs.com/package/clsx) - Documentación


