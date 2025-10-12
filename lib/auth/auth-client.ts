import { createAuthClient } from 'better-auth/react';

/**
 * Sets up the better auth instance for accessing
 * available methods
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  basePath: '/api/auth',
  fetchOptions: {
    credentials: 'include', // Ensures cookies are sent with requests
  },
});
