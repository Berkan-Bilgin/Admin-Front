import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Bir hata oluştu');
      }

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      //update the auth context
      dispatch({ type: 'LOGIN', payload: json });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
