import { redirect } from 'next/navigation';
import { auth } from '../../../auth.config';

export default async function AuthLayout( { children }: {
  children: React.ReactNode;
} ) {

  // Obtenemos la Cookies de la Session de NextAuth:
  // Auth : Nos sirve como Middleware y Como Session.
  const session = await auth();

  if ( session?.user ) return redirect( '/' );

  console.log( { session } );

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[500px] px-10">

        { children }

      </div>
    </main>
  );
}