import { useMutation, useQueryClient } from "@tanstack/react-query";
import mainAxios from "@/utils/mainAxios";
import { useRouter } from "next/router";
import { useState } from "react";

const useDeleteTrain = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const deleteTrain = async (trainId: string): Promise<void> => {
    const confirmed = window.confirm("Are you sure you want to delete this train?");
    if (!confirmed) return;

    try {
      await mainAxios.delete(`/trains/${trainId}`);
    } catch (err) {
      throw new Error("Error deleting the train. Please try again.");
    }
  };

  const { mutate } = useMutation({
    mutationFn: deleteTrain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trains"] });
      router.push("/dashboard");
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  return { handleDeleteTrain: mutate, error };
};

export default useDeleteTrain;
