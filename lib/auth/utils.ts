import { authClient } from './auth-client';

export const handleGoogleSignIn = async () => {
  try {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
  } catch (error) {
    console.error('Sign in error:', error);
  }
};
