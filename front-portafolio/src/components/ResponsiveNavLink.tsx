import Link from 'next/link';
import { ReactNode } from 'react';

interface ResponsiveNavLinkProps {
  href: string;
  active?: boolean;
  children: ReactNode;
}

const ResponsiveNavLink: React.FC<ResponsiveNavLinkProps> = ({
  href,
  active = false,
  children,
}) => (
  <Link href={href} passHref>
    <a
      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
        active
          ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
          : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
      }`}
    >
      {children}
    </a>
  </Link>
);

export const ResponsiveNavButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    className="block w-full pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
    {...props}
  >
    {children}
  </button>
);

export default ResponsiveNavLink;
