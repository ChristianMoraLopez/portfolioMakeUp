// Navbar.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Dropdown } from 'semantic-ui-react';
import ShoppingCartIcon from './ShoppingCartIcon';
import { useCart } from '@store/Cart';
import { useAuth } from '@/hooks/auth';
import Items from './Items';
import { LogOut } from 'lucide-react'; // Importa el icono de logout

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useRouter();
  const { count: cartCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter(); // Obtén el router aquí

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = async () => {
    await logout(); // Ejecuta la función de logout
    router.push('/'); // Redirige a la página de inicio después del logout
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`} style={{ backgroundImage: isScrolled ? 'none' : "url('/images/acuarela.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-white hover:bg-pink-500' : 'text-white hover:bg-white hover:text-pink-500'
              } focus:outline-none`}
              aria-controls="mobile-menu"
              aria-expanded={isNavOpen ? 'true' : 'false'}
              onClick={toggleNav}
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className={`${isNavOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isNavOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Items />
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Puedes agregar más elementos aquí si es necesario */}
          </div>
        </div>
      </div>

      <div 
        className={`sm:hidden transition-all duration-500 ease-in-out ${
          isNavOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`} 
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-3 space-y-2 backdrop-blur-md bg-white/70">
          {user ? (
            <>
              <span className="block text-lg text-gray-800 font-semibold px-3 py-2 rounded-md transition-colors duration-300 hover:bg-pink-100">
                Hola, {user.name}
              </span>
              <NavLinkMobile href="/profile" text="Perfil" />
              <NavLinkMobile href="/services" text="Servicios" />
              <NavLinkMobile href="/contact" text="Contacto" />
              <button
                type="button"
                onClick={handleLogout}
                className="block text-lg text-gray-800 font-medium px-3 py-2 rounded-md transition-colors duration-300 hover:bg-pink-100 flex items-center"
              >
                <LogOut size={18} className="mr-2" />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLinkMobile href="/login" text="Iniciar sesión" />
              <NavLinkMobile href="/signup" text="Registrarse" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLinkMobile: React.FC<{ href: string; text: string }> = ({ href, text }) => (
  <Link href={href} passHref>
    <span className="block text-lg text-gray-800 font-medium px-3 py-2 rounded-md transition-colors duration-300 hover:bg-pink-100 hover:text-pink-600 cursor-pointer">
      {text}
    </span>
  </Link>
);

export default Navbar;
