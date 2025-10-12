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

export const handleEmailSignUp = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    const result = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: '/dashboard',
    });
    return result;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const handleEmailSignIn = async (email: string, password: string) => {
  try {
    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/dashboard',
    });
    return result;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};
