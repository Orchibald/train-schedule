import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/mainAxios';

interface VerifyResponse {
  message: string;
}

const verify = async ({ email, code }: { email: string; code: number }): Promise<VerifyResponse> => {
  const response = await axios.post('/auth/verify', { email, code });
  return response.data;
};

const useVerify = (): {
  verify: (email: string, code: number) => void;
  error: Error | null;
  message: string | undefined;
} => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: verify,
    onSuccess: (data) => {
      console.log('Verification successful:', data.message);
      queryClient.invalidateQueries({ queryKey: ['verify-email'] });
    },
    onError: (error: Error) => {
      console.error('Verification failed:', error.message);
      alert(`Login failed: ${error.message}`);
    },
  });

  const verifyEmail = (email: string, code: number) => {
    mutation.mutate({ email, code });
  };

  return {
    verify: verifyEmail,
    error: mutation.error,
    message: mutation.data?.message,
  };
};

export default useVerify;
