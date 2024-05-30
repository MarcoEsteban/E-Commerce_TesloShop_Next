
export const currencyFormat = ( value: number ) => {

  // Intl :: Internacionalización para el Tipo de Moneda:
  // return new Intl.NumberFormat( 'en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2
  // } ).format( value );

  return new Intl.NumberFormat( 'es-BO', {
    style: 'currency',
    currency: 'BOB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  } ).format( value );

};