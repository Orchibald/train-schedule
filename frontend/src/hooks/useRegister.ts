import { useMutation } from '@tanstack/react-query';
import axios from '../utils/mainAxios';

interface RegisterResponse {
  message: string;
}

const register = async ({
  email,
  password,
  fullname,
  phoneNumber,
}: {
  email: string;
  password: string;
  fullname: string;
  phoneNumber: string;
}): Promise<RegisterResponse> => {
  const response = await axios.post('/auth/register', { email, password, fullname, phoneNumber });
  return response.data;
};

const useRegister = (): {
  registerUser: (email: string, password: string, fullname: string, phoneNumber: string) => void;
  error: Error | null;
  message: string | undefined;
} => {
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('Registration successful:', data.message);
    },
    onError: (error: Error) => {
      console.error('Registration failed:', error.message);
      alert(`Login failed: ${error.message}`);
    },
  });

  const registerUser = (email: string, password: string, fullname: string, phoneNumber: string) => {
    mutation.mutate({ email, password, fullname, phoneNumber });
  };

  return {
    registerUser,
    error: mutation.error,
    message: mutation.data?.message,
  };
};

export default useRegister;
