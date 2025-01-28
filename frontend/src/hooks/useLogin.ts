import { useMutation } from '@tanstack/react-query';
import axios from '../utils/mainAxios';
import { useAuthStore } from '@/stores/authStore';

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
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message);
      alert(`Login failed: ${error.message}`);
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
