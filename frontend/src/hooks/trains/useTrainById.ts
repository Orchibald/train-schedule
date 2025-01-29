import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import mainAxios from "@/utils/mainAxios";
import { Train } from "@/utils/types";

const fetchTrainById = async (id: string) => {
  const { data } = await mainAxios.get(`/trains/${id}`);
  return data;
};

const useTrainById = (id: string) => {
  const queryOptions: UseQueryOptions<Train, Error> = {
    queryKey: ['train', id],
    queryFn: () => fetchTrainById(id),
    enabled: !!id,
  };

  const { data, isLoading, error, ...queryInfo } = useQuery(queryOptions);

  return { data, isLoading, error, ...queryInfo };
};

export default useTrainById;
