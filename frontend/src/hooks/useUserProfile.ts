import { useEffect, useState } from "react";
import mainAxios from "@/utils/mainAxios";
import { useAuthStore } from "@/stores/authStore";

const useUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const { data } = await mainAxios.get("/user/profile");
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { user, isLoading, error };
};

export default useUserProfile;
