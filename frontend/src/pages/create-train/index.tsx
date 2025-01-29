'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useCreateTrain from '../../hooks/trains/useCreateTrain';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  departureCity: yup.string().required('Departure city is required'),
  arrivalCity: yup.string().required('Arrival city is required'),
  departureTime: yup.string().required('Departure time is required'),
  arrivalTime: yup.string().required('Arrival time is required'),
  price: yup.number().positive('Price must be a positive number').required('Price is required'),
  availableSeats: yup.number().positive('Available seats must be a positive number').required('Available seats is required'),
});

const CreateTrain = () => {
  const { createTrain, isError, error } = useCreateTrain();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createTrain(data);
      router.push('/dashboard');
    } catch (err) {
      alert(`Error creating train:, ${err}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Train</h2>
        {isError && <p className="text-sm text-red-500 mb-4">{(error as Error).message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Departure City</label>
            <input
              type="text"
              {...register('departureCity')}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.departureCity && <p className="text-sm text-red-500 mt-1">{errors.departureCity.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Arrival City</label>
            <input
              type="text"
              {...register('arrivalCity')}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.arrivalCity && <p className="text-sm text-red-500 mt-1">{errors.arrivalCity.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Departure Time</label>
            <input
              type="datetime-local"
              {...register('departureTime')}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.departureTime && <p className="text-sm text-red-500 mt-1">{errors.departureTime.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Arrival Time</label>
            <input
              type="datetime-local"
              {...register('arrivalTime')}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.arrivalTime && <p className="text-sm text-red-500 mt-1">{errors.arrivalTime.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Price</label>
            <input
              type="number"
              {...register('price')}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Available Seats</label>
            <input
              type="number"
              {...register('availableSeats')}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.availableSeats && <p className="text-sm text-red-500 mt-1">{errors.availableSeats.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Create Train
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrain;
