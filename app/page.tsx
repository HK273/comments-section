import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8 text-center'>
        <div>
          <h1 className='text-4xl font-bold text-gray-900'>Comments Section</h1>
          <p className='mt-2 text-lg text-gray-600'>
            Welcome to your comments platform
          </p>
        </div>

        <div className='space-y-4'>
          <Link
            href='/sign-in'
            className='block w-full rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            Sign In
          </Link>

          <Link
            href='/dashboard'
            className='block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            Go to Dashboard
          </Link>
        </div>

        <div className='text-sm text-gray-500'>
          <p>Built with Next.js, Better Auth, and Neon PostgreSQL</p>
        </div>
      </div>
    </div>
  );
}
