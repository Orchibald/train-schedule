import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useUserProfile from "@/hooks/useUserProfile";
import useTrainById from "@/hooks/useTrainById";
import mainAxios from "@/utils/mainAxios";

const EditTrain = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: train, isLoading } = useTrainById(id as string);
  const { user } = useUserProfile();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (train) {
      setValue("departureCity", train.departureCity);
      setValue("arrivalCity", train.arrivalCity);
      setValue("departureTime", train.departureTime);
      setValue("arrivalTime", train.arrivalTime);
      setValue("price", train.price);
      setValue("availableSeats", train.availableSeats);
    }
  }, [train, setValue]);

  const onSubmit = async (data: any) => {
    try {
      await mainAxios.put(`/trains/${id}`, data);
      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Train</h2>
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Departure City</label>
            <input
              type="text"
              {...register("departureCity")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Arrival City</label>
            <input
              type="text"
              {...register("arrivalCity")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Departure Time</label>
            <input
              type="datetime-local"
              {...register("departureTime")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Arrival Time</label>
            <input
              type="datetime-local"
              {...register("arrivalTime")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Price</label>
            <input
              type="number"
              {...register("price")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Available Seats</label>
            <input
              type="number"
              {...register("availableSeats")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTrain;
