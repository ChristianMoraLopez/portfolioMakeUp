import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';

interface DropdownLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string; // Asegura que href esté definido como obligatorio
  children: ReactNode;
}

const DropdownLink: React.FC<DropdownLinkProps> = ({ href, children, ...props }) => (
  <Menu.Item>
    {({ active }) => (
      <Link href={href} passHref>
        <a
          {...props}
          className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
            active ? 'bg-gray-100' : ''
          } focus:outline-none transition duration-150 ease-in-out`}
        >
          {children}
        </a>
      </Link>
    )}
  </Menu.Item>
);

interface DropdownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ children, ...props }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
          active ? 'bg-gray-100' : ''
        } focus:outline-none transition duration-150 ease-in-out`}
        {...props}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);

export default DropdownLink;
