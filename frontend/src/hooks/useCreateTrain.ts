import { useMutation } from '@tanstack/react-query';
import axios from '../utils/mainAxios';
import useTrainStore from '@/stores/trainStore';

interface TrainData {
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

const createTrain = async (trainData: TrainData) => {
  const response = await axios.post('/trains', trainData);
  return response.data;
};

const useCreateTrain = () => {
  const { trains, setTrains } = useTrainStore();

  const mutation = useMutation({
    mutationFn: createTrain,
    onSuccess: (data) => {
      setTrains([data, ...trains]);
    },
    onError: (error: Error) => {
      alert(`Failed to create train: ${error.message}`);
    },
  });

  const createTrainHandler = (trainData: TrainData) => {
    mutation.mutate(trainData);
  };

  return {
    createTrain: createTrainHandler,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useCreateTrain;
