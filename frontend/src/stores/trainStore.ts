import { Train } from '@/utils/types';
import { create } from 'zustand';

interface TrainStore {
  departureCity: string;
  arrivalCity: string;
  trains: Train[];
  setDepartureCity: (city: string) => void;
  setArrivalCity: (city: string) => void;
  setTrains: (trains: Train[]) => void;
}

const useTrainStore = create<TrainStore>((set) => ({
  departureCity: '',
  arrivalCity: '',
  trains: [],
  setDepartureCity: (city: string) => set({ departureCity: city }),
  setArrivalCity: (city: string) => set({ arrivalCity: city }),
  setTrains: (trains: Train[]) => set({ trains }),
}));

export default useTrainStore;
