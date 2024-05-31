# Proyecto de E-Commerce "TesloShop" - Realizando con Fernando Herrera

# Descripción

# Correr en dev
Pasos para levantar la app en desarrollo

1. Clonar el repositorio
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la Base de Datos ```docker-compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar el seed ```npm run seed```
7. Correr el proyecto ```npm run dev```


# Correr en prod
Pasos para generar la app en producción

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

# Paquetes y Dependencias Utilizada en el Proyecto:
### React Icons
Para agregar iconos a nuestro E-Commerce.
````
npm i react-icons
````
- [React Icons ](https://react-icons.github.io/react-icons/) - Documentación

### Zustand
Para gestionar nuestro estados globales de nuestro E-Commerce.
````
npm i zustand
````
- [Zustand](https://zustand-demo.pmnd.rs/) - Documentación

### CLSX
Este Paquete Permite poner clases condicionales de Tailwind.
````
npm i clsx
````
- [CLSX](https://www.npmjs.com/package/clsx) - Documentación

### Swiperjs
Para hacer slide show a nuestra imagen e ir deslizando uno tras otro.
````
npm i swiper
````
- [Swiperjs](https://swiperjs.com/get-started) - Documentación

### Zod
Para validar las credenciales de los formularios
````
npm i zod
````
- [Zod](https://zod.dev/) - Documentación

### bcryptjs
Para emcriptar el password
````
npm i bcryptjs
npm i @types/bcryptjs -D
````
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Documentación

## Prisma 
- ### Configuracion Paso a Paso: 
1. Instalamos Prisma ```npm i prisma --save-dev```
2. Inicializamos con la Base de Datos de nuestra preferencia ```PostgreSQL | MySQL | SQLite | SQLServer | MongoDB```
3. Instalamos o Inicializamos con PostgreSQL como DB ```npx prisma init --datasource-provider PostgreSQL```

- ```prisma migrate``` Permite crear la Tabla a partir de un Schema o Model de Prisma.
- ```prisma generate``` Permite crear el cliente para poder realizar Query o Consulta a la base de datos.

- ```prisma db pull``` Permite crear el esquema(Schema | Tablas) o modelo acorde a la base de datos que tengamos en nuestra DB.

4. Formas de crear las tablas ó schema en Prismas ya ser si Tenemos una __'DB ya creada'__ || __'Creamos la DB a partir de un Schema de Prisma'__:
- __4.1 Primera Forma:__

Creando la DB desde cero con Prisma a partir de un Modelo o Schema:
```ts
  # Schema o Modelo
  model User {
    id    Int     @id @default(autoincrement())
    email String  @unique
    name  String?
  }
```
Entonces utilizamos ```npx prisma migrate dev --name nombreDeLaMigracion``` esto nos va a crear la tabla en la DB 
y tambien luego podriasmo generara el cliente, pero mayormente siempre crea, pero por seguridad podriamos generar el cliente ```npx prisma generate```.

- __4.2 Segunda Forma:__ 

Puede que tengamos una consulta SQL o una tabla o varias tabla ya creada en nuestra DB:
```sql
  # Consulta SQL
  CREATE TABLE empleados (
    ID SERIAL PRIMARY KEY,
    NOMBRE varchar(50),
    PUESTO varchar(50),
    SUELDO integer
  );
```
Entonces utilizamos ```npx prisma db pull``` esto nos va a permitir crear un modelo acorde a nuestra tabla de nuestra DB. 

- ### Configuracion Paso a Paso de un Script o Creando una Semilla para la DB: 

Creando un Script(Semilla) que en modo __Produccion__ me cargue mi data en la DB.

Creando un procedimiento, es decir una __pequeña aplicación__ totalmente ajena al proyecto de __Nextjs__, 
simplemente creamos un __Script__  para luego ejecutarlo y cargar la DB

1. Creanos un archivo en la ruta ```src/seed/```, llamada ```seed-database.ts```
2. Crear una funcion anonima auto invocada:
```ts
  async function main() {


    console.log('Seed Ejecutado correctamente')
  }

  // Funcion anonima auto invocada:
  (() => {
    main();
  } ();)
```
3. Ahora hacemos la Instalación de una dependecia para ejecutar archivo __TypeScript__ porque __Node__ solo ejecuta archivo
__JavaScript__, y esta dependencia permite ejecutar directamente archivo ```TypeScript``` en ```Node```.
```zsh
npm i -D ts-node
```
4. Creamos un ```Script ó Comando``` en el archivo ```package.json```  en la parte de ```scripts``` y colocar la siguiente linea:
```json
// seed :: es el nombre del comando.
"seed": "ts-node src/seed/seed-database.ts"
```
5. Generamos un archivo ```tsconfig.json``` en la carpeta ```./src/seed``` para que el ```script``` corra correctamente, entonce generamos
el archivo con el siguiente comando:
```zsh
// archivo de configuracion por defecto de TypeScript
npx tsc --init
```
6. Y finalmente ejecutamos ```npm run seed```

- ### Borrando los datos de las Tablas de la DB:
1. Creamos una carpeta y archivo llamada ```./lib/prisma.ts```, dentro de la ruta ```./src```
2. Agregamos el siguiente codigo:
```ts
import {PrismaClient} from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma

if ( process.env.NODE_ENV !== 'production' ) globalForPrisma.prisma = prisma;

```
3. Dentro la funcion ```main() {}``` del archivo ```./src/seed/seed-database.ts``` agregamos el siguiente codigo: 
```ts
import prisma from '../lib/prisma';

async function main() {

  // 1. Borrar todos los datos de las Tablas | Borrar todos los Registros Previos de las Tablas
  await Promise.all( [
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ] );

  console.log('Seed Ejecutado correctamente')
}
```

## NextAuth
- ### Instalacion para el funcionamiento:

1. Instalar NextAuth sin el ```@beta```:
```bash
npm install next-auth
```
2. Instalar NextAuth con el ```@beta``` esto nos va a permitir instalar la version '5' o superior, y esta version es la que necesitamos para el proyecto:
```bash
npm install next-auth@beta
```
3. Creando nuestra variable de entorno y tener una semilla unica en nuestro NextAuth 
```bash
openssl rand -base64 32
```
4. La variable de entorno que nos genere copiarlo y guardarlo en nuestro archivo ```.env``` de la siguiente forma:
```.env
AUTH_SECRET="llave-secreta"
```
- [NextAuth](https://authjs.dev/reference/nextjs) - Documentación de Next-Auth
- [Next](https://nextjs.org/learn/dashboard-app/adding-authentication) - Documentación de Next de como usar y configurar NextAuth


- ### Configuración Básica Paso a Paso:

1.  Creamos un archivo llamado ```auth.config.ts``` dentro de la carpeta ```/src```, y copiamos el siguiente codigo:
```ts
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [], // Dentro va la configuracion de [Google, GitHub, Nuestra_Propia_Autenticacion ...]
};
```