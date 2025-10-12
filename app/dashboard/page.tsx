import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { SignOutButton } from '@/app/components/auth/sign-out-button';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className='p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='mb-4 text-2xl font-bold'>
          Welcome {session.user.name || session.user.email}!
        </h1>
        <SignOutButton />
      </div>

      <div className='rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-2 text-lg font-semibold'>User Information</h2>
        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
        <p>
          <strong>ID:</strong> {session.user.id}
        </p>
        {session.user.name && (
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>
        )}
        {session.user.image && (
          <div className='mt-2'>
            <Image
              src={session.user.image}
              alt='Profile'
              width={64}
              height={64}
              className='h-16 w-16 rounded-full'
            />
          </div>
        )}
      </div>
    </div>
  );
}
