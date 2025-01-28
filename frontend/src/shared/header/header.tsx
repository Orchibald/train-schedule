import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/authStore';
import '@/app/globals.css'

const Header = () => {
  const router = useRouter();
  const { clearAccessToken } = useAuthStore();
  const { user, clearUser } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem('user');
    clearUser();
    clearAccessToken();
    router.push('/login');
  };

  const handleNavigateToProfile = () => {
    router.push('/profile');
  };

  const handleNavigateToCreateTrain = () => {
    router.push('/create-train');
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md w-full">
      <div className="flex-row items-center justify-center w-full">
        {user ? (
          <>
            {user.role === 'ADMIN' && (
              <div className='flex items-center gap-4'>
                <button
                  onClick={handleNavigateToCreateTrain}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
                >
                  Create
                </button>
                <span
                  className="cursor-pointer text-black font-bold"
                  onClick={handleNavigateToProfile}
                >
                  {user.fullname}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer px-4 py-2"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            onClick={handleLogout}
          >
            Login
          </button>
        )}
      </div>
    </header>

  );
};

export default Header;
