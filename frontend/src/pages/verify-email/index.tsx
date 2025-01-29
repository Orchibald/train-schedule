'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import useVerify from '@/hooks/auth/useVerify';

const schema = yup.object().shape({
  code: yup.number().required('Verification code is required').positive('Code must be positive').integer('Code must be an integer'),
});

const VerifyEmail = () => {
  const { verify } = useVerify();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    if (email) {
      await verify(email, data.code);
      router.push('/login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Verify Email</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Verification Code</label>
            <input
              type="text"
              {...register('code')}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.code && <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
