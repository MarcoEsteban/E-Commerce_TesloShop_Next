import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {

  // State:
  cart: CartProduct[];

  // Action:
  addProductToCart: ( product: CartProduct ) => void;
  // updateProductQuantity: () => void;
  // removeProduct: () => void;

}

export const useCartStore = create<State>()(

  // Esto va a generar una Discrepancis, es decir un Problema cuando se realice la Rehidratacion == Renderizacion:
  // 'REHIDRATACION' :: Va a generar un discrepancia de lo que va a renderizar el Servidor y el Cliente
  persist(
    // get :: Me permite obtener el estado actual del Store de Zustand.
    // set :: Me permite realizar el cambio del estado actual del Store de Zustand.
    ( set, get ) => ( {

      // State Initial:
      cart: [],

      // Metodos ó Actions:
      addProductToCart: ( product: CartProduct ) => {

        // Destructuracion:
        const { cart } = get();
        console.log( cart );

        //? 1. Revisar si el producto existe en el carrito con la talla seleccionada. 
        // .some() :: Determina que basta que uno cumpla la condicion que especifiquemos sale de la funcion.
        const productInCart = cart.some(
          ( item ) => ( item.id === product.id && item.size === product.size )
        );

        // Si no esta el Producto en el Carrito entonces lo Agregamos:
        if ( !productInCart ) {
          set( { cart: [ ...cart, product ] } );
          return;
        }

        //? 2. Si el producto existe por talla, entonces tengo que incrementar su cantidad.
        const updateCartProducts = cart.map( item => {
          if ( item.id === product.id && item.size === product.size ) {
            // Devuelve el producto que cumple con la condicion e indicamos que modifique su cantidad
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        } );

        set( { cart: updateCartProducts } );

      }

    }),
    {
      name: 'shopping-cart', // Nombre del LocalStorage.
      skipHydration: true, //? 1ra Forma de Solucionar el Problema de la Rehidratacion.
    }
  )

);