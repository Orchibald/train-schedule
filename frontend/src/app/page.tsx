'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'next/navigation';


export default function Home() {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken, router]);

  return (
      <div>
        <h1>Welcome to the App!</h1>
      </div>
  );
}
