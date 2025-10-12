'use client';

import { useState } from 'react';
import {
  handleGoogleSignIn,
  handleEmailSignUp,
  handleEmailSignIn,
} from '@/lib/auth/utils';
import { GoogleIcon } from '@/app/components/icons/google-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignUpSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      await handleEmailSignUp(email, password, name);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Sign up failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignInSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await handleEmailSignIn(email, password);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Sign in failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Welcome to Comments Section
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Sign in to your account or create a new one
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='signin' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='signin'>Sign In</TabsTrigger>
                <TabsTrigger value='signup'>Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value='signin' className='space-y-4'>
                <div className='space-y-4'>
                  <Button
                    onClick={handleGoogleSignIn}
                    variant='outline'
                    className='w-full hover:cursor-pointer'
                    disabled={isLoading}
                  >
                    <GoogleIcon className='mr-2 h-4 w-4' />
                    Continue with Google
                  </Button>

                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <span className='w-full border-t' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                      <span className='bg-background text-muted-foreground px-2'>
                        Or continue with email
                      </span>
                    </div>
                  </div>

                  <form
                    onSubmit={handleEmailSignInSubmit}
                    className='space-y-4'
                  >
                    <div className='space-y-2'>
                      <Label htmlFor='signin-email'>Email</Label>
                      <Input
                        id='signin-email'
                        name='email'
                        type='email'
                        placeholder='Enter your email'
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='signin-password'>Password</Label>
                      <Input
                        id='signin-password'
                        name='password'
                        type='password'
                        placeholder='Enter your password'
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type='submit'
                      className='w-full'
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value='signup' className='space-y-4'>
                <div className='space-y-4'>
                  <Button
                    onClick={handleGoogleSignIn}
                    variant='outline'
                    className='w-full hover:cursor-pointer'
                    disabled={isLoading}
                  >
                    <GoogleIcon className='mr-2 h-4 w-4' />
                    Continue with Google
                  </Button>

                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <span className='w-full border-t' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                      <span className='bg-background text-muted-foreground px-2'>
                        Or create account with email
                      </span>
                    </div>
                  </div>

                  <form
                    onSubmit={handleEmailSignUpSubmit}
                    className='space-y-4'
                  >
                    <div className='space-y-2'>
                      <Label htmlFor='signup-name'>Name</Label>
                      <Input
                        id='signup-name'
                        name='name'
                        type='text'
                        placeholder='Enter your name'
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='signup-email'>Email</Label>
                      <Input
                        id='signup-email'
                        name='email'
                        type='email'
                        placeholder='Enter your email'
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='signup-password'>Password</Label>
                      <Input
                        id='signup-password'
                        name='password'
                        type='password'
                        placeholder='Create a password'
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type='submit'
                      className='w-full'
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className='mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600'>
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
