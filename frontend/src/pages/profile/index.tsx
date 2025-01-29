import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/authStore';
import { useUpdateProfile } from '@/hooks/user/useUpdateUser';
import { useBookingStore } from '@/stores/bookingStore';
import Header from '@/components/header/header';

const Profile = () => {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.fullname || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const updateProfile = useUpdateProfile();
  const router = useRouter();
  const { bookings, removeBooking } = useBookingStore();

  useEffect(() => {
    if (user) {
      setName(user.fullname || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  const handleSave = () => {
    updateProfile.mutate(
      { fullname: name, phoneNumber },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
      }
    );
  };

  return (
    <>
      <Header />

      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Profile</h1>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            value={user?.email}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
        >
          Save
        </button>

        {updateProfile.isError && (
          <p className="text-red-500 text-center mt-2">Error updating profile</p>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings yet.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4">
              {bookings.map((train) => (
                <li
                  key={train.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {train.departureCity} → {train.arrivalCity}
                    </h3>
                    <p className="text-gray-600">Price: {train.price}$</p>
                  </div>
                  <button
                    onClick={() => removeBooking(train.id)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
