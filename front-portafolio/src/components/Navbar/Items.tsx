// items.tsx
import React from 'react';
import Link from 'next/link';
import { Dropdown, Menu } from 'semantic-ui-react';
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
      <div className="flex-1 flex items-center justify-start lg:justify-start">
        <Link href="/" passHref>
          <span className="text-[#003B4A] text-2xl font-bold flex items-center cursor-pointer transition-colors duration-300 hover:text-[#005d75]">
            <span className="hidden lg:inline">Valentina&apos;s Makeup Portfolio</span>
          </span>
        </Link>
      </div>

      {/* Centered VG logo for mobile */}
      <div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
        <Link href="/" passHref>
          <span className="text-[#003B4A] text-3xl font-bold cursor-pointer transition-colors duration-300 hover:text-[#005d75]">
            <span className="sm:hidden text-center ms-madi-regular">VG</span>
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-4">
     
        <NavLink href="/contact" text="Contacto" icon={<Phone size={18} />} />
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
                LogOut
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
        <Link href="/cart" passHref>
          <Menu.Item active={pathname === '/front-portafolio/store/Cart.tsx'} className="p-0">
            <ShoppingCartIcon cartCount={cartCount} name="Canasta" />
          </Menu.Item>
        </Link>
      </div>
    </div>
  );
};

const NavLink: React.FC<{ href: string; text: string; icon: React.ReactNode }> = ({ href, text, icon }) => (
  <Link href={href} passHref>
    <span className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300 flex items-center">
      {icon}
      <span className="ml-2">{text}</span>
    </span>
  </Link>
);

export default Items;
