import { useMutation } from '@tanstack/react-query';
import axios from '../utils/mainAxios';

interface LoginResponse {
  accessToken: string;
}

const login = async ({ email, password }: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};

const useLogin = (): {
  login: (email: string, password: string) => void;
  error: Error | null;
  accessToken: string | undefined;
} => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful:', data.accessToken);
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message);
    },
  });

  const loginUser = (email: string, password: string) => {
    mutation.mutate({ email, password });
  };

  return {
    login: loginUser,
    error: mutation.error,
    accessToken: mutation.data?.accessToken,
  };
};

export default useLogin;
