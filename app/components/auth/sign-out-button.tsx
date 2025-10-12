'use client';

import { authClient } from '@/lib/auth/auth-client';
import { Button } from '@/components/ui/button';

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function SignOutButton({ className, children }: SignOutButtonProps) {
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <Button onClick={handleSignOut} variant='destructive' className={className}>
      {children || 'Sign Out'}
    </Button>
  );
}
