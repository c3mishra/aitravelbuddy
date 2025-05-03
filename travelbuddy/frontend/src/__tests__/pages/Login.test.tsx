import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import Login from '@/pages/Login';
import { userApi } from '@/lib/api';

// Mock the API and navigation
vi.mock('@/lib/api', () => ({
  userApi: {
    login: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login form correctly', () => {
    render(<Login />);
    
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/Register here/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    // Try to submit without filling in the fields
    await user.click(screen.getByRole('button', { name: /Sign In/i }));
    
    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields/i)).toBeInTheDocument();
    });
  });

  it('handles login success correctly', async () => {
    const user = userEvent.setup();
    const mockUser = { _id: '123', name: 'Test User', email: 'test@example.com' };
    
    // Mock successful login
    vi.mocked(userApi.login).mockResolvedValueOnce(mockUser);
    
    render(<Login />);
    
    // Fill in form fields
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'password123');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /Sign In/i }));
    
    // Check if API was called with correct params
    await waitFor(() => {
      expect(userApi.login).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('handles login failure correctly', async () => {
    const user = userEvent.setup();
    
    // Mock failed login
    vi.mocked(userApi.login).mockRejectedValueOnce(new Error('Invalid credentials'));
    
    render(<Login />);
    
    // Fill in form fields
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'wrongpassword');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /Sign In/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock delayed login response
    vi.mocked(userApi.login).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({ _id: '123' }), 100))
    );
    
    render(<Login />);
    
    // Fill in form fields
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'password123');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /Sign In/i }));
    
    // Check for loading state
    expect(screen.getByText(/Signing in/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signing in/i })).toBeDisabled();
  });
});
