import { CartProduct } from '@/interfaces';
import { create } from 'zustand';

interface State {

  // State:
  cart: CartProduct[];

  // Action:
  addProductToCart: ( product: CartProduct ) => void;
  // updateProductQuantity: () => void;
  // removeProduct: () => void;

}

export const useCartStore = create<State>()(

  // get :: Me permite obtener el estado actual del Store de Zustand.
  // set :: Me permite realizar el cambio del estado actual del Store de Zustand.
  ( set, get ) => ( {

    // State Initial:
    cart: [],

    // Metodos ó Actions:
    addProductToCart: ( product: CartProduct ) => {

      // Destructuracion:
      const { cart } = get();

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

  } )
);