import React from 'react';
import Link from 'next/link';
import { Dropdown } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useCart } from '@store/Cart';
import { useAuth } from '@/hooks/auth';
import ShoppingCartIcon from './ShoppingCartIcon';
import { User, ShoppingBag, Phone, Briefcase, LogIn, UserPlus, LogOut } from 'lucide-react';

const Items: React.FC = () => {
  const { pathname } = useRouter();
  const { count: cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <div className="w-full flex items-center justify-between px-4 py-2">
      {/* Logo */}
      <div className="flex-1 flex items-center justify-start">
        <Link href="/" className="text-[#003B4A] text-xl md:text-2xl font-bold flex items-center cursor-pointer transition-colors duration-300 hover:text-[#005d75]">
          <span className="hidden md:inline">Valentina&apos;s Makeup Services</span>
        </Link>
      </div>

      {/* Centered VG logo for mobile */}
      <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
        <Link href="/" className="text-[#003B4A] text-2xl md:text-3xl font-bold cursor-pointer ms-madi-regular transition-colors duration-300 hover:text-[#005d75]">
        
            <span className="text-center">VG</span>
        
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <NavLink href="/contactus" text="Contacto" icon={<Phone size={18} />} />
        <NavLink href="/services" text="Servicios" icon={<Briefcase size={18} />} />

        {user ? (
          <Dropdown
            trigger={
              <span className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300 flex items-center">
                <User size={18} className="mr-2" />
                {user.name}
              </span>
            }
            pointing
            className="link item"
          >
            <Dropdown.Menu>
              <Dropdown.Item as={Link} href="/dashboard">
                <User size={14} className="mr-2" />
                Ver mi cuenta
              </Dropdown.Item>

              <Dropdown.Item as={Link} href="/contactus">
                <User size={14} className="mr-2" />
                Contacta con nosotros
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/profile">
                <User size={14} className="mr-2" />
                Ver perfil
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/orders">
                <ShoppingBag size={14} className="mr-2" />
                Mis órdenes
              </Dropdown.Item>
              <Dropdown.Item as="span" onClick={logout}>
                <LogOut size={14} className="mr-2" />
                Cerrar sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <NavLink href="/login" text="Login" icon={<LogIn size={18} />} />
            <NavLink href="/signup" text="Signup" icon={<UserPlus size={18} />} />
          </>
        )}
      </div>

      {/* Shopping Cart Icon - visible on all screen sizes */}
      <div className="flex items-center">
        <Link href="/cart" className="p-0">
          <ShoppingCartIcon cartCount={cartCount} name="Canasta" />
        </Link>
      </div>
    </div>
  );
};

const NavLink: React.FC<{ href: string; text: string; icon: React.ReactNode }> = ({ href, text, icon }) => (
  <Link href={href} className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300 flex items-center">
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
);

export default Items;
