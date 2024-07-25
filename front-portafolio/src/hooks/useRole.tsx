// src/hooks/useRole.ts (si estás usando TypeScript)

import { useState, useEffect } from 'react';
import axios from '@/lib/axios'; // Asegúrate de importar desde la configuración adecuada

const useRole = () => {
  const [role, setRole] = useState<string>(''); // Define el tipo como string
  const [loading, setLoading] = useState<boolean>(true); // Define el tipo como boolean
  const [error, setError] = useState<string | null>(null); // Define el tipo como string | null

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get('/check-role'); // Usa el URL base configurado
        setRole(response.data.role);
      } catch (error) {
        setError('Error fetching role'); // Ahora es aceptable
        console.error('Error fetching role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, loading, error };
};

export default useRole;
