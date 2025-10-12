import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignOutButton } from '@/app/components/auth/sign-out-button';
import { authClient } from '@/lib/auth/auth-client';

// Get the mocked authClient (mocked globally in jest.setup.ts)
const mockedAuthClient = authClient as jest.Mocked<typeof authClient>;

describe('SignOutButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign out button', () => {
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    expect(button).toBeInTheDocument();
  });

  it('calls signOut when clicked', async () => {
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAuthClient.signOut).toHaveBeenCalledTimes(1);
    });
  });

  it('handles sign out errors gracefully', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockedAuthClient.signOut.mockRejectedValue(new Error('Sign out failed'));

    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAuthClient.signOut).toHaveBeenCalledTimes(1);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Sign out error:',
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });
});
