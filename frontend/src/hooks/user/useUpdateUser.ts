import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import mainAxios from '@/utils/mainAxios';

interface UpdateProfileData {
  fullname?: string;
  phoneNumber?: string;
}

export const useUpdateProfile = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await mainAxios.patch('/user/update', data);
      return response.data;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    },
  });
};
