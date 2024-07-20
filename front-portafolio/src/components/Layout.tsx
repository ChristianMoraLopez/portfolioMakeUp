// AppLayout.tsx

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/auth';
import Loading from '@components/Loading';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth(); // Asumiendo que useAuth maneja la autenticación correctamente

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-4">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
