import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useTrainStore from "@/stores/trainStore";
import mainAxios from "@/utils/mainAxios";
import { Train } from "@/utils/types";

const fetchTrains = async (departureCity: string, arrivalCity: string, sort: string) => {
  const { data } = await mainAxios.get(`/trains`, {
    params: {
      departureCity,
      arrivalCity,
      sort,
    },
  });
  return data;
};

const useTrains = (departureCity: string, arrivalCity: string, sort: string, searchTriggered: boolean) => {
  const setTrains = useTrainStore((state) => state.setTrains);

  const queryOptions: UseQueryOptions<Train[], Error> = {
    queryKey: ['trains', departureCity, arrivalCity, sort],
    queryFn: () => fetchTrains(departureCity, arrivalCity, sort),
    enabled: searchTriggered,
  };

  const { data, isLoading, ...queryInfo } = useQuery(queryOptions);

  if (data) {
    setTrains(data);
  }

  return { data, isLoading, ...queryInfo };
};

export default useTrains;
