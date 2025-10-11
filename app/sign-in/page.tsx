'use client';

import { authClient } from '@/lib/auth-client';
import { GoogleIcon } from '@/app/components/icons/google-icon';

export default function SignInPage() {
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Welcome to Comments Section
          </p>
        </div>

        <div className='mt-8 space-y-6'>
          <div>
            <button
              onClick={handleGoogleSignIn}
              className='group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
            >
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <GoogleIcon className='h-5 w-5' />
              </span>
              Continue with Google
            </button>
          </div>

          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
