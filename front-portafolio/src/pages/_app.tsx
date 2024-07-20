import '@/styles/globals.css'; // Importa tus estilos globales de Tailwind CSS
import 'semantic-ui-css/semantic.min.css'; // Importa Semantic UI CSS
import { AppProps } from 'next/app';
import CartProvider from '@store/Cart'; // Importa el CartProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;