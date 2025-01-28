import mainAxios from "@/utils/mainAxios";
import { useRouter } from "next/router";
import { useState } from "react";

const useDeleteTrain = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleDeleteTrain = async (trainId: string) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this train?");
      if (!confirmed) return;

      await mainAxios.delete(`/trains/${trainId}`);
      router.push("/dashboard");
    } catch (error) {
      setError("Error deleting the train. Please try again.");
    }
  };

  return { handleDeleteTrain, error };
};

export default useDeleteTrain;
