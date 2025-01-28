import { useState } from "react";
import useTrains from "@/hooks/useTrains";
import Header from "@/shared/header/header";
import useUserProfile from "@/hooks/useUserProfile";
import { useDebounceEffect } from "@/hooks/useDebouceEffect";
import { format } from 'date-fns';
import { useRouter } from "next/navigation";
import useDeleteTrain from "@/hooks/useDeleteTrain";
import useTrainStore from "@/stores/trainStore";

const Dashboard = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [sort, setSort] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { user } = useUserProfile();
  const router = useRouter();

  const [debouncedDepartureCity, setDebouncedDepartureCity] = useState(departureCity);
  const [debouncedArrivalCity, setDebouncedArrivalCity] = useState(arrivalCity);
  const [debouncedSort, setDebouncedSort] = useState(sort);

  const { data: trains, isLoading, refetch } = useTrains(debouncedDepartureCity, debouncedArrivalCity, debouncedSort, searchTriggered);

  const formatTime = (time: string) => {
    const parsedTime = new Date(time);
    return format(parsedTime, 'yyyy-MM-dd HH:mm');
  };

  const handleEditTrain = (trainId: string) => {
    router.push(`/edit-train/${trainId}`);
  };

  useDebounceEffect(() => {
    setDebouncedDepartureCity(departureCity);
  }, [departureCity], 500);

  useDebounceEffect(() => {
    setDebouncedArrivalCity(arrivalCity);
  }, [arrivalCity], 500);

  useDebounceEffect(() => {
    setDebouncedSort(sort);
  }, [sort], 500);

  const handleSearch = () => {
    setSearchTriggered(true);
    refetch();
  };

  const { handleDeleteTrain } = useDeleteTrain();

  const onDelete = (id: string) => {
    handleDeleteTrain(id);
    refetch();
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">TrainFOR</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Departure City"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Arrival City"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No sorting</option>
            <option value="price">Sort by Price</option>
            <option value="departureTime">Sort by Departure Time</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Search
        </button>

        <div className="w-full max-w-4xl mt-8">
          {isLoading && <p className="text-center text-gray-600">Loading...</p>}

          {trains && (
            <ul className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {trains.map((train) => (
                <li
                  key={train.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col"
                >
                  <h2 className="text-lg font-semibold mb-2">
                    {train.departureCity} → {train.arrivalCity}
                  </h2>
                  <p className="text-gray-600">Price: {train.price}$</p>
                  <p className="text-gray-600">
                    Time: {formatTime(train.departureTime)} - {formatTime(train.arrivalTime)}
                  </p>
                  <button
                    onClick={() => handleEditTrain(train.id)}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
                  >
                    Reserve
                  </button>
                  {user?.role === "ADMIN" && (
                    <>
                      <button
                        onClick={() => handleEditTrain(train.id)}
                        className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition"
                      >
                        Change
                      </button>
                      <button
                        onClick={() => onDelete(train.id)}
                        className="mt-4 px-6 py-2 bg-red-700 text-white font-semibold rounded-md shadow-md hover:bg-red-800 transition"
                      >
                        Delete
                      </button>
                    </>

                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
